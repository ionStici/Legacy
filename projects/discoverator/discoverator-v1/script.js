"use strict";

const startButton = document.querySelector(".start");
const btns = document.querySelectorAll(".btn");

const message = document.querySelector(".panel-message");

let capitalOut;

const convertMil = function (num) {
  return `${(num / 1000000).toFixed(1)} mil.`;
};

const convertK = function (num) {
  return `${(num / 1000).toFixed(1)} k m2`;
};

const random = function () {
  return Math.trunc(Math.random() * 53);
};

startButton.addEventListener("click", function () {
  let capital1;
  let capital2;
  let capital3;

  let btn1 = document.querySelector(".btn-1");
  let btn2 = document.querySelector(".btn-2");
  let btn3 = document.querySelector(".btn-3");

  fetch("https://restcountries.com/v3.1/region/europe")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const country = data[random()];
      capital3 = country.capital[0];
      capitalOut = country.capital[0];

      const values = Object.values(country.languages);
      let language = [];
      for (const item of values) {
        language.push(item);
      }

      let html = `
            <!-- <div class="country"> -->
                <div class="country-header">
                    <img class="country-header-flag" src="${
                      country.flags.svg
                    }" />
                    <p class="country-header-name">${country.name.common}</p>
                </div>

                <p class="country-language">🗣 ${language[0]}</p>
                <p class="country-population">👫 ${convertMil(
                  country.population
                )}</p>
                <p class="country-area">${convertK(country.area)}</p>

                <p class="country-capital">Guess the capital...</p>

            <!-- </div> -->
            `;

      //   document.querySelector(".main").style.height = "auto";

      // guessed attribute

      document.querySelector(".opacity").insertAdjacentHTML("beforeend", html);

      document.querySelector(".opacity").style.opacity = "1";

      return fetch("https://restcountries.com/v3.1/region/europe");
    })
    .then((response) => response.json())
    .then((data) => {
      capital1 = data[random()].capital[0];

      return fetch("https://restcountries.com/v3.1/region/europe");
    })
    .then((response) => response.json())
    .then((data) => {
      capital2 = data[random()].capital[0];

      let capitalsArray = [capital1, capital2, capital3];

      let init = 0;
      let c1, c2, c3;
      capitalsArray.forEach((cap, i, arr) => {
        if (init === 0) {
          c1 = arr[Math.trunc(Math.random() * 3)];
          arr.splice(arr.indexOf(c1), 1);

          init++;
        } else if (init === 1) {
          c2 = arr[Math.trunc(Math.random() * 2)];
          arr.splice(arr.indexOf(c2), 1);
          c3 = arr[0];
          init++;
        }
      });

      btn1.textContent = c1;
      btn2.textContent = c2;
      btn3.textContent = c3;
    });

  startButton.style.display = "none";

  document.querySelector(".control-panel").style.cssText = `
        width: 100%;
        height: 100%;
        margin-right: 2rem;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
            rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
        padding: 1rem 1.5rem;
        background-image: none;
        background-size: none;
        background-position: none;
        position: relative;

    `;

  document.querySelector(".panel").style.display = "flex";

  setTimeout(() => {
    document.querySelector(".panel").style.opacity = "1";
  }, 500);
});

let correctAnswers = 0;
let wrongAnswers = 0;

btns.forEach((btn) => {
  btn.addEventListener("click", function () {
    if (btn.textContent === capitalOut) {
      btn.style.backgroundColor = "#51cf66";
      btn.style.transform = "scale(1.1)";
      message.style.opacity = "1";
      message.style.color = "green";
      message.textContent = `Correct answer: ${capitalOut} 🎉`;
      correctAnswers++;
    } else {
      btn.style.backgroundColor = "#ffa8a8";
      btn.style.transform = "translateX(0.3rem)";
      setTimeout(() => (btn.style.transform = "translateX(-0.3rem)"), 150);

      setTimeout(() => (btn.style.transform = "translateX(0.3rem)"), 250);
      setTimeout(() => (btn.style.transform = "translateX(-0.3rem)"), 350);

      setTimeout(() => (btn.style.transform = "translateX(0)"), 450);

      message.style.opacity = "1";
      message.style.color = "#f03e3e";
      message.textContent = `Incorrect answer`;
      wrongAnswers++;
    }
  });
});
