"use strict";

// ROOT
const root = document.documentElement;

// COLORS
const colorBlue1 = "#a5d8ff";
const colorBlue2 = "#1c7ed6";
const colorBlueText = "#1864ab";
const blue = [colorBlue1, colorBlue2, colorBlueText];

const colorBrown1 = "#ffd8a8";
const colorBrown2 = "#e8590c";
const colorBrownText = "#d9480f";
const brown = [colorBrown1, colorBrown2, colorBrownText];

const colorRed1 = "#ffc9c9";
const colorRed2 = "#e03131";
const colorRedText = "#c92a2a";
const red = [colorRed1, colorRed2, colorRedText];

// SET COLORS
const setColor = function (currentSlide) {
  //   setTimeout(() => {
  if (currentSlide === 0) {
    root.style.setProperty("--color-1", blue[0]);
    root.style.setProperty("--color-2", blue[1]);
    root.style.setProperty("--color-text", blue[2]);
    return;
  }

  if (currentSlide === 1) {
    root.style.setProperty("--color-1", brown[0]);
    root.style.setProperty("--color-2", brown[1]);
    root.style.setProperty("--color-text", brown[2]);
    return;
  }

  if (currentSlide === 2) {
    root.style.setProperty("--color-1", red[0]);
    root.style.setProperty("--color-2", red[1]);
    root.style.setProperty("--color-text", red[2]);
    return;
  }
  //   }, 50);
};

// SLIDER
const slider = function () {
  // ELEMENTS //
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slider__slide");

  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  const dotContainer = document.querySelector(".slider__dots");

  // STATE //
  let currentSlide = 0;
  const maxSlide = slides.length;

  // FUNCTIONS //
  const createDots = function () {
    dotContainer.innerHTML = "";
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="slider__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".slider__dot")
      .forEach((dot) => dot.classList.remove("slider__dot--active"));

    document
      .querySelector(`.slider__dot[data-slide="${slide}"]`)
      .classList.add("slider__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${90 * (i - slide)}rem)`;
    });
  };

  // Next and Prev //

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
    setColor(currentSlide);
  };

  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }

    goToSlide(currentSlide);
    activateDot(currentSlide);
    setColor(currentSlide);
  };

  // Initial Values //
  const init = function () {
    createDots();
    activateDot(currentSlide);
    goToSlide(currentSlide);
    setColor(currentSlide);
  };

  init();

  // EVENT HANDLERS
  btnLeft.addEventListener("click", prevSlide);
  btnRight.addEventListener("click", nextSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("slider__dot")) return;

    currentSlide = +e.target.dataset.slide;

    goToSlide(currentSlide);
    activateDot(currentSlide);
    setColor(currentSlide);
  });
};

slider();
