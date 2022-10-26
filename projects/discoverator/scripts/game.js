// const all = async function () {
//   const res = await fetch(`https://restcountries.com/v3.1/all`);
//   const data = await res.json();

//   console.log(data[100].maps.openStreetMaps);
// };

// all();

const introMarkup = `
            <div class="game__intro-layout">
              <div class="game__intro-layout__box">
                <h2 class="game__heading-2">Guess the Capital</h2>
                <h3 class="game__heading-3">
                  <span>An Educational Game</span>
                  <ion-icon
                    class="game__joy-icon"
                    name="game-controller"
                  ></ion-icon>
                </h3>

                <p class="game__text">
                  <ion-icon name="checkmark-outline"></ion-icon>
                  The rules are simple: Guess the capital of the given country.
                </p>

                <p class="game__text">
                  <ion-icon name="checkmark-outline"></ion-icon>
                  By answering correctly or incorrectly, you earn points
                  accordingly.
                </p>

                <p class="game__text">
                  <ion-icon name="checkmark-outline"></ion-icon>
                  You can compete with your friend, or challenge your knowledge
                  by yourself.
                </p>

                <p class="game__text">
                  <ion-icon name="checkmark-outline"></ion-icon>
                  By the way, you need a 850px+ wide screen to play the game.
                  <br />
                  The dev got lazy and didn't want to implement responsive
                  design.
                </p>

                <p class="game__text">
                  <ion-icon name="checkmark-outline"></ion-icon>
                  Press Begin to proceed and select game settings.
                </p>


                <div class="game__intro-btns-box">
                  <button class="game__intro-btn game__intro-btn--begin">Begin</button>
                  <button class="game__intro-btn game__intro-btn--2">
                    Previous Games
                  </button>
                </div>
              </div>

              <img
                class="game__globe-img"
                src="./img/game-intro.jpg"
                alt="Finger pointing to the map"
              />
            </div>
`;

const gameContainer = document.querySelector(".game__container");

gameContainer.innerHTML = "";
gameContainer.insertAdjacentHTML("afterbegin", introMarkup);

const introLayout = document.querySelector(".game__intro-layout");

const beginBtn = document.querySelector(".game__intro-btn--begin");
const historyBtn = document.querySelector(".game__intro-btn--2");

beginBtn.addEventListener("click", function () {
  introLayout.innerHTML = "";
  console.log("Begin Button");
});

historyBtn.addEventListener("click", function () {
  console.log("Previous Games Button");
});
