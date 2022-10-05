"use strict";

// // // // // // // // // // // // // // // // // // // //
// NAVIGATION FUNCTIONALITY //
// // // // // // // // // // // // // // // // // // // //

const btnsBox = document.querySelector(".nav__lists");
const btns = document.querySelectorAll(".nav__list");
const layouts = document.querySelectorAll(".content");

btnsBox.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("nav__list") ||
    e.target.classList.contains("nav__list__icon") ||
    e.target.classList.contains("nav__list__text")
  ) {
    btns.forEach((btn) => {
      btn.classList.remove("nav__list--active");
    });

    layouts.forEach((layout) => {
      layout.style.display = "none";
    });

    const target = e.target.closest(".nav__list");
    target.classList.add("nav__list--active");

    const id = target.dataset.layout;
    const layout = document.querySelector(`#${id}`);

    layout.style.display = "flex";

    // if ("home" === target.dataset.layout) {
    //   funcName();
    // }
  }
});

// // // // // // // // // // // // // // // // // // // //
// HOME //
// // // // // // // // // // // // // // // // // // // //

const funcName = function () {
  const country = "china";

  /*
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (location) {
        const { latitude, longitude } = location.coords;
        const coords = `${latitude},${longitude}`;

        fetch(`https://geocode.xyz/${coords}?geoit=json`)
          .then((response) => response.json())
          .then((data) => {
            return fetch(`https://restcountries.com/v2/name/${data.country}`);
          })
          .then((response) => response.json())
          .then((data) => console.log(data));
      },
      function () {}
    );
  }
  */

  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
      //   console.log(data[0]);

      let numberLength = `${data[0].population}`;
      let number;
      if (numberLength.length >= 3) {
        number = `${Number.parseInt(data[0].population / 1000)} K`;
      } else if (numberLength.length >= 6) {
        number = `${Number.parseInt(data[0].population / 1000000)} MM`;
      }

      const countryName = data[0].name;
      const countryFlag = data[0].flags.svg;
      const capital = `🌆 ${data[0].capital}`;
      const region = `🌍 ${data[0].region}`;
      const peopleNumber = `👫 ${number}`;
      const language = `🗣 ${data[0].languages[0].name}`;
      const currency = `💰 ${data[0].currencies[0].name} ${data[0].currencies[0].symbol}`;

      document.querySelector(
        ".country__flag"
      ).style.backgroundImage = `url(${countryFlag})`;
      document.querySelector(".country__name").textContent = countryName;
      document.querySelector(".country__capital").textContent = capital;
      document.querySelector(".country__region").textContent = region;
      document.querySelector(".country__people").textContent = peopleNumber;
      document.querySelector(".country__language").textContent = language;
      document.querySelector(".country__currency").textContent = currency;
    });
};
funcName();
