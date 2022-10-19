"use strict";

const slider = function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slider__slide");

  const dotContainer = document.querySelector(".slider__dots");

  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `
        <button class="slider__dot" data-slide="${i}"></button>
        `
      );
    });
  };

  const activateDots = function (slide) {
    document
      .querySelectorAll(".slider__dot")
      .forEach((dot) => dot.classList.remove("slider__dot--active"));

    document
      .querySelector(`.slider__dot[data-slide="${slide}"]`)
      .classList.add("slider__dot--active");
  };

  const goToSlide = function () {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };

  const init = function () {
    createDots();
    activateDots(0);
  };

  init();
};

slider();
