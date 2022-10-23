// // // // // // // // // // // // // // // // // // // //
// Clicker - Leaflet //
// // // // // // // // // // // // // // // // // // // //

class PinsData {
  constructor(popupTitle, shortNote, coords) {
    this.popupTitle = popupTitle;
    this.shortNote = shortNote;
    this.coords = coords;
  }
}

class Clicker {
  #coords;
  #map;

  #pinsArr = [];

  formContainer = document.querySelector(".clicker__form-box");
  pinsContainer = document.querySelector(".clicker__pins");
  pinsSubContainer;

  constructor() {
    this.getLocalStorage();

    // Get COords
    setTimeout(() => {
      this.getCoords();
    }, 1);

    // GETTING COORDS
    // this.#coords = app.sendCoords();
    // this.#displayMap();

    // SPINNER START
    const mapEl = document.querySelector(".clicker__map");
    mapEl.innerHTML = "";
    mapEl.insertAdjacentHTML(
      "afterbegin",
      `<ion-icon class="sync-icon sync-icon--map" name="sync-outline"></ion-icon>`
    );
    setTimeout(() => {
      document.querySelector(".sync-icon--map").style.display = "none";
    }, 15000);

    // DISPLAY FORM MESSAGE
    this.formContainer.innerHTML = "";
    this.formContainer.insertAdjacentHTML(
      "afterbegin",
      `
          <p class="clicker__note">Click on the map to add a pin 😇</p>
      `
    );

    // SHOW PINS CONTAINER
    setTimeout(() => {
      this.pinsContainer.style.opacity = "1";
    }, 150);

    // GO TO LOCATION
    this.pinsContainer.addEventListener("click", this.goToLocation.bind(this));

    // RESET MAP BUTTON
    document
      .querySelector(".clicker__map__panel__reset-map-btn")
      .addEventListener("click", this.resetMap.bind(this));
  }
  // END CONSTRUCTOR

  resetMap() {
    this.#map.off();
    this.#map.remove();

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
      .setPopupContent(`You are here 👻`)
      .openPopup();

    this.#pinsArr.forEach((pin) => {
      L.marker(pin.coords)
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
        .setPopupContent(`${pin.popupTitle}`)
        .openPopup();
    });

    this.#map.on("click", this.mapClickEvent.bind(this));
  }

  // GET COORDS FROM PREVIOUS CLASS
  getCoords() {
    this.#coords = [51.505, -0.09];
    this.#displayMap();
  }

  #displayMap() {
    this.#map = L.map("map").setView(this.#coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // HIDE SPINNER
    document.querySelector(".sync-icon--map").style.display = "none";

    // MAP BOX SHADOW
    document.querySelector(".clicker__map").style.boxShadow =
      "0 0 15px rgba(0, 0, 0, 0.1)";

    // let pin = new PinsData(
    //   "You are here 👻",
    //   "Your current location",
    //   this.#coords
    // );

    // this.#pinsArr.push(pin);

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
      .setPopupContent(`You are here 👻`)
      .openPopup();

    this.pinsContainer.innerHTML = "";
    this.pinsContainer.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="clicker__pin clicker__pin--initial">
        <p class="clicker__pin__number clicker__pin__number--initial">
          <ion-icon class="clicker__pin__number__icon" name="infinite-outline"></ion-icon>
        </p>
        <div class="clicker__pin__box">
          <p class="clicker__pin__popup">You are here 👻</p></p>
          <p class="clicker__pin__note">Your current location</p>
        </div>
        <p data-coords="${
          this.#coords
        }" class="clicker__btn clicker__btn--mod">Go!</p>
        </div>
        <div class="clicker__pins--2"></div>
      `
    );

    this.pinsSubContainer = document.querySelector(".clicker__pins--2");

    setTimeout(() => {
      document.querySelector(".clicker__pin--initial").style.height = "6rem";
    }, 200);

    // RENDER LOCAL STORAGE
    this.renderPinsAndMarkers();

    this.#map.on("click", this.mapClickEvent.bind(this));
  }

  mapClickEvent(event) {
    this.formBig();

    const { lat, lng } = event.latlng;
    const clickedCoords = [lat, lng];

    this.formContainer.innerHTML = "";

    setTimeout(() => {
      this.formContainer.insertAdjacentHTML(
        "afterbegin",
        `
              <ion-icon class="clicker__form-box__close-form" name="close-circle-outline"></ion-icon>
              <p class="clicker__note clicker__note--title">Fill the form 👻</p>
              <div class="clicker__form-el">
              <div>
              <input class="input-popup" type="text" placeholder="Popup title" />
              <input class="input-note" type="text" placeholder="A short note" />
              </div>
              <button class="clicker__btn">Click!</button>
              </div>
              `
      );
    }, 300);

    setTimeout(() => {
      document.querySelector(".input-popup").focus();
    }, 350);

    setTimeout(() => {
      document
        .querySelector(".clicker__btn")
        .addEventListener("click", this.formClick.bind(this, clickedCoords));
    }, 350);

    setTimeout(() => {
      document
        .querySelector(".clicker__form-box__close-form")
        .addEventListener("click", this.formSmall.bind(this));
    }, 350);
  }

  formClick(clickedCoords) {
    const popupTitle = document.querySelector(".input-popup").value;
    const shortNote = document.querySelector(".input-note").value;

    this.formSmall();

    let pin = new PinsData(popupTitle, shortNote, clickedCoords);
    this.#pinsArr.push(pin);

    this.setLocalStorage();

    // INSERT NEW PIN BOXES
    this.pinsSubContainer.insertAdjacentHTML(
      "beforeend",
      `
          <div class="clicker__pin">
              <p class="clicker__pin__number">${
                this.#pinsArr.indexOf(pin) + 1
              }</p>
              <div class="clicker__pin__box">
                  <p class="clicker__pin__popup">${popupTitle}</p>
                  <p class="clicker__pin__note">${shortNote}</p>
              </div>
              <p data-coords="${clickedCoords}" class="clicker__btn clicker__btn--mod">Go!</p>
          </div>
      `
    );
    setTimeout(() => {
      document.querySelectorAll(".clicker__pin").forEach((pin) => {
        pin.style.height = "6rem";
      });
    }, 100);

    // DISPLAY THE PINS
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
      .setPopupContent(`${popupTitle}`)
      .openPopup();

    // DISPLAY AGAIN FORM MESSAGE
    // this.formContainer.innerHTML = "";
    // this.formContainer.insertAdjacentHTML(
    //   "afterbegin",
    //   `<p class="clicker__note">Click on the map to add a pin 😇</p>`
    // );
  }

  formBig() {
    this.formContainer.style.height = "12rem";
    this.pinsContainer.style.height = "25rem";
  }

  formSmall() {
    this.formContainer.style.height = "5.5rem";
    this.pinsContainer.style.height = "31.3rem";

    // DISPLAY AGAIN FORM MESSAGE
    this.formContainer.innerHTML = "";
    this.formContainer.insertAdjacentHTML(
      "afterbegin",
      `<p class="clicker__note">Click on the map to add a pin 😇</p>`
    );
  }

  goToLocation(event) {
    if (!event.target.classList.contains("clicker__btn")) return;

    const coords = event.target.dataset.coords.split(",");

    // this.#map.setView([+coords[0], +coords[1]], 13, {
    this.#map.setView(coords, 15, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  setLocalStorage() {
    localStorage.setItem("pins", JSON.stringify(this.#pinsArr));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("pins"));
    if (!data) return;

    this.#pinsArr = data;
  }

  renderPinsAndMarkers() {
    this.#pinsArr.forEach((pin, i) => {
      // DISPLAY THE PINS
      L.marker(pin.coords)
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
        .setPopupContent(`${pin.popupTitle}`)
        .openPopup();

      // INSERT NEW PIN BOXES
      this.pinsSubContainer.insertAdjacentHTML(
        "beforeend",
        `
                  <div class="clicker__pin">
                      <p class="clicker__pin__number">${i + 1}</p>
                      <div class="clicker__pin__box">
                          <p class="clicker__pin__popup">${pin.popupTitle}</p>
                          <p class="clicker__pin__note">${pin.shortNote}</p>
                      </div>
                      <p data-coords="${
                        pin.coords
                      }" class="clicker__btn clicker__btn--mod">Go!</p>
                  </div>
              `
      );

      // SET PINS HEIGHT
      setTimeout(() => {
        document.querySelectorAll(".clicker__pin").forEach((pin) => {
          pin.style.height = "6rem";
        });
      }, 100);
    });
  }

  resetLocalStorage() {
    // Remove Markers

    this.#pinsArr.forEach((pin, i) => {
      //   this.#map.removeLayer();
    });

    localStorage.removeItem("pins");
    this.#pinsArr = [];
    this.pinsSubContainer.innerHTML = "";

    location.reload();
  }

  pageResetSettings() {
    document.querySelector(".content__home").style.display = "none";
    document.querySelector(".content__clicker").style.display = "flex";
  }
}
const clicker = new Clicker();

document
  .querySelector(".clicker__map__panel__reset-btn")
  .addEventListener("click", function () {
    clicker.resetLocalStorage();
  });

// // // // // // // // // // // // // // // // // // // //
// // // // // // // // // // // // // // // // // // // //
