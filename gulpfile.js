"use strict";


var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var svgSprite = require("gulp-svg-sprite");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var run = require("run-sequence");
var uglify = require('gulp-uglify');
var pump = require('pump');
var htmlmin = require('gulp-htmlmin');
var csscomb = require('csscomb');
var del = require("del");

//Создание файла стилей и минификация
gulp.task("style", function () {
  return gulp.src("less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());

});

// Минификация js
gulp.task("uglify", function () {
  return gulp.src("js/*.js")
    .pipe(uglify())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

// Размещение кода в разметке
gulp.task("html", function () {
  return gulp.src("*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

// Формирование изображений в формате webp
gulp.task("webp", function () {
  return gulp.src("img/**/*.{png,jpg}")
    .pipe(webp({
      quality: 80
    }))
    .pipe(gulp.dest("build/img"));
});

// Создание векторного спрайта
gulp.task("sprite", function () {
  return gulp.src("img/**/*.svg")
    .pipe(svgSprite({
      mode: {
        stack: {
            sprite: "../sprite.svg"  //sprite file name
        }
    },
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/svg"));
});

// Сортировка css-свойств
gulp.task("csscomb", function () {
  return gulp.src("less/blocks/*.less")
    .pipe(csscomb())
    .pipe(gulp.dest("sass/blocks/"));
});

// Оптимизация изображений
gulp.task("imagemin", function () {
  return gulp.src("img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.jpegtran({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("img"));
});

// Запуск сервера со слежением за необходимыми файлами
gulp.task("serve", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  gulp.watch('less/**/*.less', gulp.parallel(["style"]));
  gulp.watch('*.html', gulp.parallel(["html"]));
  gulp.watch('build\*.html').on('change', server.reload);
  gulp.watch('js/*.js', gulp.parallel(["uglify"]));

});
// Копирование файлов
gulp.task("copy", function () {
  return gulp.src([
      "fonts/*.{woff,woff2}",
      "img/**",
      "js/*.js"
    ], {
      base: "."
    })
    .pipe(gulp.dest("build"));
});


// Удаление файлов
gulp.task("clean", function () {
  return del("build");
});


// Сборка проекта
gulp.task("build", gulp.series(
  "clean",
  "copy",
  "style",
  "uglify",
  "sprite",
  "html",
  "webp"
));
