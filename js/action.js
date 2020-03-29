'use struct'


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

var exp = document.querySelector(".experience__interactive");
var before = exp.querySelector(".experience__button--before");
var after = exp.querySelector(".experience__button--after");
var rabbitBefore = exp.querySelector(".experience__rabbit--before");
var rabbitAfter = exp.querySelector(".experience__rabbit--after");
var toggle = exp.querySelector(".experience__toggle")


function changeCatProgress () {
  rabbitBefore.classList.toggle('experience__rabbit--show');
  rabbitAfter.classList.toggle('experience__rabbit--show');

  toggle.classList.toggle('experience__toggle--before');
  toggle.classList.toggle('experience__toggle--after');
}

before.addEventListener('click', changeCatProgress);
after.addEventListener('click', changeCatProgress);
