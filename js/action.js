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
    nav.classList.toggle("main-nav--opened");


}

burger.addEventListener('click', burgerClickMenu);



//experience block
var progress = document.querySelector('.experience__interactive');

var before = progress.querySelector(".experience__button--before");
var after = progress.querySelector(".experience__button--after");

var imgBefore = progress.querySelector('.experience__cat--before');
var imgAfter = progress.querySelector('.experience__cat--after');

var toggle = progress.querySelector(".experience__toggle");
var scale = progress.querySelector('.experience__progress');
var range = scale.querySelector('.experience__range');

function changeCatProgress () {


  before.addEventListener('click', function () {
    imgBefore.style.width = '100%';
    imgAfter.style.width = '0%';
    range.value = 0;
    toggle.classList.add('experience__toggle--before');
    toggle.classList.remove('experience__toggle--after');

  });

  after.addEventListener('click', function () {
    imgBefore.style.width = '0%';
    imgAfter.style.width = '100%';
    range.value = 100;
    toggle.classList.remove('experience__toggle--before');
    toggle.classList.add('experience__toggle--after');
  });

  // toggle.classList.remove('experience__toggle--before');
  // toggle.classList.add('experience__toggle--after');
}

before.addEventListener('click', changeCatProgress);
after.addEventListener('click', changeCatProgress);

  window.addEventListener('load', function(){
    if (viewportWidth <= tabletWidth) {
      imgBefore.style.width = 100 + '%';
      imgAfter.style.width = 0 + '%';
    }
  });

if (viewportWidth > tabletWidth) {

  var rangeToggle = scale.querySelector('.experience__range');

  range.addEventListener('input', function() {
    imgBefore.style.width = (100 - range.value) + '%';
    imgAfter.style.width = range.value + '%';

    rangeToggle.style.left = range.value + '%';

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

}
