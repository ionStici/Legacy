// // // // // // // // // // // // // // // // // // // //
// NAVIGATION FUNCTIONALITY

const btnsBox = document.querySelector(".nav__lists");
const btns = document.querySelectorAll(".nav__list");
const layouts = document.querySelectorAll(".content");

btnsBox.addEventListener("click", function (e) {
  e.preventDefault();

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

    if (layout.classList.contains("locations")) {
      layout.style.display = "block";
      return;
    }

    layout.style.display = "flex";

    // if (e.target.dataset.layout === "clicker") {
    //   const clicker = new Clicker();
    // }
  }
});

// // // // // // // // // // // // // // // // // // // //
