// // // // // // // // // // // // // // // // // // // // // // // // // // //
// Find Locations Section

const countryBoxLoc = document.querySelector(".loc__country-box");

const countryLocError = function (errorMessage) {
  countryBoxLoc.innerHTML = "";

  countryBoxLoc.insertAdjacentHTML(
    "afterbegin",
    `
              <p class="err-message">${errorMessage}</p>
              <p class="try-again-loc">Try again!</p>
          `
  );
};

const renderCountryLoc = function (country) {
  countryBoxLoc.innerHTML = "";
  countryBoxLoc.insertAdjacentHTML(
    "afterbegin",
    `<ion-icon class="sync-icon" name="sync-outline"></ion-icon>`
  );

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

      countryBoxLoc.innerHTML = "";
      countryBoxLoc.insertAdjacentHTML(
        "afterbegin",
        `
          <div class="country__name-box">
          <div class="country__flag country__flag--loc"></div>
              <p class="country__name">${countryName}</p>
          </div>
          <div class="country__info">
              <p class="country__capital">${capital}</p>
              <p class="country__region">${region}</p>
              <p class="country__people">${population}</p>
              <p class="country__language">${language}</p>
              <p class="country__currency">${currency}</p>
          </div>
          `
      );

      // prettier-ignore
      document.querySelector(".country__flag--loc").style.backgroundImage = `url(${countryFlag})`;

      //
    })
    .catch((err) => {
      countryLocError(err.message);

      if (!document.querySelector(".loc__search-bar").value) {
        countryNamesBox.innerHTML = "";
        countryNamesBox.insertAdjacentHTML(
          "afterbegin",
          `
              <p class="loc__ex__country-name">Switzerland</p>
              <p class="loc__ex__country-name">Germany</p>
              <p class="loc__ex__country-name">Canada</p>
        `
        );
      }
    })
    .finally(() => {});
};

// // // // // // // // // // // // // // // // // // // // // // // // // // //

const searchForm = document.querySelector(".loc__form");
const searchInput = document.querySelector(".loc__search-bar");
const searchBtn = document.querySelector(".loc__search-bar__search");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  search();
});

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  search();
});

const search = function () {
  searchInput.blur();
  renderCountryLoc(searchInput.value);
  searchInput.value = "";
};

// // // // // // // // // // // // // // // // // // // // // // // // // // //

const countryNamesBox = document.querySelector(".loc__ex__box");
let data = [];

let allCountries = new XMLHttpRequest();
allCountries.open("GET", `https://restcountries.com/v3.1/all`);
allCountries.send();

allCountries.addEventListener("load", function () {
  let countriesList = JSON.parse(this.responseText);

  countriesList.forEach((country) => {
    data.push(country.name.common.toLowerCase());
  });
});

searchInput.addEventListener("input", function (e) {
  let input = searchInput.value;

  let examples = [];

  data.forEach((cn) => {
    if (cn.includes(input)) {
      let cnArr = cn.split(" ").map((n) => {
        return n[0].toUpperCase() + n.slice(1);
      });

      examples.push(cnArr.join(" "));
    }
  });

  if (input === ".") {
    countryNamesBox.innerHTML = "";

    data.forEach((cn) => {
      let cnArr = cn.split(" ").map((n) => {
        return n[0].toUpperCase() + n.slice(1);
      });

      examples.push(cnArr.join(" "));
    });
  }

  countryNamesBox.innerHTML = "";

  examples.forEach((ex, i) => {
    countryNamesBox.insertAdjacentHTML(
      "beforeend",
      `<p class="loc__ex__country-name">${ex}</p>`
    );
  });

  if (!input) {
    countryNamesBox.innerHTML = "";
    countryNamesBox.insertAdjacentHTML(
      "afterbegin",
      `
      <p class="loc__ex__country-name">Switzerland</p>
      <p class="loc__ex__country-name">Germany</p>
      <p class="loc__ex__country-name">Canada</p>
      `
    );
  }
});

countryNamesBox.addEventListener("click", function (e) {
  if (!e.target.classList.contains("loc__ex__country-name")) return;

  let countryName = e.target.textContent;
  renderCountryLoc(countryName);
});

renderCountryLoc("italy");

// // // // // // // // // // // // // // // // // // // // // // // // // // //
