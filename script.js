const insertMarkup = function () {
  const markup = `
    <main class="main">
        <div class="links">
            <a class="link" href="./p/viatour">Viatour</a>
            <a class="link" href="./p/traviavel">Traviavel</a>
            <a class="link" href="./p/slider">Slider</a>
            <a class="link" href="./p/discoverator">Discoverator</a>
        </div>
        <div class="links">
            <a class="link" href="./p/irina">Irina</a>
            <a class="link" href="./p/ionsticidev">ionstici.dev</a>
        </div>
    </main>
    `;

  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
};

const input = document.querySelector(".input");

document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();

  const pin = 11;
  const inputPin = +input.value;

  if (!inputPin) {
    input.placeholder = "Empty Input";
    document.documentElement.style.setProperty("--placeholder-color", "red");
    return;
  }

  if (pin !== inputPin) {
    input.placeholder = "Wrong Pin";
    document.documentElement.style.setProperty("--placeholder-color", "red");
  }

  if (pin === inputPin) {
    document.querySelector("body").innerHTML = "";
    insertMarkup();
  }

  input.value = "";
  input.blur();
});
