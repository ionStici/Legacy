document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.querySelector(".input");
  const btn = document.querySelector(".btn");

  const insertMarkup = function () {
    const markup = `
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
      `;
  
    document.querySelector(".main").insertAdjacentHTML("beforeend", markup);
  };

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

    setTimeout(insertMarkup, 500);
    input.setAttribute("readonly", "readonly");

    btn.style.color = "#bbb";
    btn.style.border = "1px solid #ddd";

    btn.addEventListener("click", function (e) { e.preventDefault(); });
  }

  input.value = "";
  input.blur();
});


