"use strict";

// // // // // // // // // // // // // // // // // // // //
// NAVIGATION FUNCTIONALITY //

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
  }
});

// // // // // // // // // // // // // // // // // // // //
// Render Country Box //

const countryBox = document.querySelector(".country");

countryBox.innerHTML = "";
countryBox.insertAdjacentHTML(
  "afterbegin",
  `<ion-icon class="sync-icon" name="sync-outline"></ion-icon>`
);

let countryBoxContent = `
    <div class="country__name-box">
        <div class="country__flag"></div>
        <p class="country__name"></p>
    </div>
    <div class="country__info">
        <p class="country__capital"></p>
        <p class="country__region"></p>
        <p class="country__people"></p>
        <p class="country__language"></p>
        <p class="country__currency"></p>
    </div>
    `;

const countryBoxError = function (errorMessage) {
  countryBox.innerHTML = "";

  countryBox.insertAdjacentHTML(
    "afterbegin",
    `
        <p class="err-message">${errorMessage}</p>
        <p class="try-again">Try again!</p>
    `
  );
};

const renderCountryBox = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then((response) => {
      if (!response.ok) throw new Error("Failed to fetch country data 🤕");
      return response.json();
    })
    .then((data) => {
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
      const population = `👫 ${number}`;
      const language = `🗣 ${data[0].languages[0].name}`;
      const currency = `💰 ${data[0].currencies[0].name} ${data[0].currencies[0].symbol}`;

      countryBox.innerHTML = "";
      countryBox.insertAdjacentHTML("afterbegin", countryBoxContent);

      document.querySelector(
        ".country__flag"
      ).style.backgroundImage = `url(${countryFlag})`;
      document.querySelector(".country__name").textContent = countryName;
      document.querySelector(".country__capital").textContent = capital;
      document.querySelector(".country__region").textContent = region;
      document.querySelector(".country__people").textContent = population;
      document.querySelector(".country__language").textContent = language;
      document.querySelector(".country__currency").textContent = currency;
    })
    .catch((err) => {
      countryBoxError(err.message);
      errorBtn();
    })
    .finally(() => {
      // hm, ok nevermind
    });
};

// renderCountryBox("not-working");
// renderCountryBox("italy");

// // // // // // // // // // // // // // // // // // // //

class App {
  #coords;
  #currentLocation;

  constructor() {
    this.getCoords();
  }

  getCoords() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.#setCoords.bind(this),
        function (err) {
          const errorMessage = `${err.message} <hr><br> Allow the browser to read the device location in order to experience the app's features.`;
          countryBoxError(errorMessage);
          errorBtn();
        }
      );
    }
  }

  #setCoords(location) {
    const { latitude, longitude } = location.coords;
    this.#coords = [latitude, longitude];

    // Send coords to Clicker class
    clicker.getCoords(this.#coords);

    // Get current position
    this.geocoding(this.#coords);
  }

  geocoding(coords) {
    coords = `${coords[0]},${coords[1]}`;
    fetch(`https://geocode.xyz/${coords}?geoit=json`)
      .then((response) => {
        if (!response.ok)
          throw new Error("Geocoding failed because of restriction reasons 🤕");
        return response.json();
      })
      .then((data) => {
        this.#currentLocation = data.country;
        renderCountryBox(this.#currentLocation);
      })
      .catch((err) => {
        countryBoxError(err.message);
        errorBtn();
      });
  }

  tryAgain() {
    if (!this.#coords) this.getCoords();
    if (this.#coords) this.geocoding(this.#coords);
  }

  //   sendCoords() {
  //     return this.#coords;
  //   }
}
const app = new App();

const errorBtn = function () {
  const tryAgainBtn = document.querySelector(".try-again");
  tryAgainBtn.addEventListener("click", function () {
    countryBox.innerHTML = "";
    countryBox.insertAdjacentHTML(
      "afterbegin",
      `<ion-icon class="sync-icon" name="sync-outline"></ion-icon>`
    );

    app.tryAgain();
  });
};

// // // // // // // // // // // // // // // // // // // //
// Clicker - Leaflet //
// // // // // // // // // // // // // // // // // // // //

class Clicker {
  #coords;
  #map;

  constructor() {}

  getCoords(coords) {
    this.#coords = coords;
    this.#displayMap();
  }

  #displayMap() {
    this.#map = L.map("map").setView(this.#coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    L.marker(this.#coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "leaflet-popup",
        })
      )
      .setPopupContent("You are here 👻")
      .openPopup();

    this.#map.on("click", this.clickEvent.bind(this));
  }

  clickEvent(event) {
    const { lat, lng } = event.latlng;
    const clickedCoords = [lat, lng];

    L.marker(clickedCoords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: "leaflet-popup",
        })
      )
      .setPopupContent("New Popup")
      .openPopup();
  }
}

const clicker = new Clicker();

// Move the map window to the marker
// map.setView(clickedCoords, 13, {
// animate: true,
// pan: {
//   duration: 1,
// },
//   });

// // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //
