// // // // // // // // // // // // // // // // // // // // // // // // // // //

const form = document.querySelector(".form");
const input = document.querySelector(".input");

// // // // // // // // // // // // // // // // // // // // // // // // // // //

const insertMarkup = function () {
  const markup = `
        <div class="links">
            <a class="link" href="./p/irina">Irina</a>
            <a class="link" href="./p/ionsticidev">ionstici.dev</a>
        </div>
    `;

  document.querySelector(".main").insertAdjacentHTML("beforeend", markup);
};

// // // // // // // // // // // // // // // // // // // // // // // // // // //

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const pin = 111;
  const inputPin = input.value;

  if (inputPin.length === 0) {
    input.placeholder = "Empty Input";
    document.documentElement.style.setProperty("--placeholder-color", "red");
    return;
  }

  if (pin !== +inputPin) {
    input.placeholder = "Wrong Pin";
    document.documentElement.style.setProperty("--placeholder-color", "red");
  }

  if (pin === +inputPin) {
    input.placeholder = "Correct";
    document.documentElement.style.setProperty("--placeholder-color", "green");
    setTimeout(() => {
      form.remove();
      insertMarkup();
    }, 500);
  }

  input.value = "";
  input.blur();
});

// // // // // // // // // // // // // // // // // // // // // // // // // // //
