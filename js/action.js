'use struct';


var nav = document.querySelector(".main-nav");
var burger = nav.querySelector(".main-nav__toggle");
var viewportWidth = document.body.clientWidth;

var decktopWidth = 1440;
var tabletWidth = 768;

//nojs
nav.classList.remove('main-nav--nojs');

//Menu mobile version
function burgerClickMenu(){
  if (nav.classList.contains("main-nav--closed")) {
    nav.classList.toggle("main-nav--closed");
    nav.classList.toggle("main-nav--opened");
  }
  else if (!nav.classList.contains("main-nav--opened")) {
    nav.classList.toggle("main-nav--closed");
  }


}

burger.addEventListener('click', burgerClickMenu);

if (viewportWidth > tabletWidth) {
  nav.classList.remove("main-nav--open");
  nav.classList.remove("main-nav--closed");

}


//experience block

var exp = document.querySelector(".experience__interactive");
var before = exp.querySelector(".experience__button--before");
var after = exp.querySelector(".experience__button--after");
var rabbitBefore = exp.querySelector(".experience__rabbit--before");
var rabbitAfter = exp.querySelector(".experience__rabbit--after");
var toggle = exp.querySelector(".experience__toggle");

var progress = document.querySelector('.experience__interactive');


function changeCatProgress () {
  rabbitBefore.classList.toggle('experience__rabbit--show');
  rabbitAfter.classList.toggle('experience__rabbit--show');

  toggle.classList.toggle('experience__toggle--before');
  toggle.classList.toggle('experience__toggle--after');
}

before.addEventListener('click', changeCatProgress);
after.addEventListener('click', changeCatProgress);


if (viewportWidth > tabletWidth) {
  var imgBefore = progress.querySelector('.experience__rabbit--before');
  var imgAfter = progress.querySelector('.experience__rabbit--after');
  var scale = progress.querySelector('.experience__progress');
  var range = scale.querySelector('.experience__toggle-range');
  var toggle = scale.querySelector('.experience__range-label');
  var toggleClick;
  toggle.addEventListener('mousedown', function() {
    toggleClick = true;
    console.log("click down");
});
  document.addEventListener('mouseup', function() {
    toggleClick = false;
    console.log("click up");
  });

  document.addEventListener('mousemove', function(e) {
      var x = e.clientX;

      if (toggleClick) {
        toggle.style.left = (x - (viewportWidth-428)/2) + 'px';
      }

  });

  range.addEventListener('input', function() {
    imgBefore.style.width = (100 - range.value) + '%';
    imgAfter.style.width = range.value + '%';

    toggle.style.left = range.value + '%';
  });

  before.addEventListener('click', function () {
    imgBefore.style.width = '100%';
    imgAfter.style.width = '0%';
    range.value = 0;
  });

  after.addEventListener('click', function () {
    imgBefore.style.width = '0%';
    imgAfter.style.width = '100%';
    range.value = 100;
  });

  console.log(scale,range);
}
