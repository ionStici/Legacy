// // // // // // // // // // // // // // // // // // // //
// NAVIGATION FUNCTIONALITY

const btnsBox = document.querySelector(".nav__lists");
const btns = document.querySelectorAll(".nav__list");
const layouts = document.querySelectorAll(".content");

/*
// EVENT PROPAGATION
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
*/

// // // // // // // // // // // // // // // // // // // //

btns[0].addEventListener("click", function (e) {
  e.preventDefault();

  btns.forEach((btn) => {
    btn.classList.remove("nav__list--active");
  });

  layouts.forEach((layout) => {
    layout.style.display = "none";
  });

  this.classList.add("nav__list--active");

  document.querySelector(".content__home").style.display = "flex";
});

// // // // // // // // // // // // // // // // // // // //

btns[1].addEventListener("click", function (e) {
  e.preventDefault();

  btns.forEach((btn) => {
    btn.classList.remove("nav__list--active");
  });

  layouts.forEach((layout) => {
    layout.style.display = "none";
  });

  this.classList.add("nav__list--active");

  document.querySelector(".clicker").style.display = "flex";
});

// // // // // // // // // // // // // // // // // // // //

btns[2].addEventListener("click", function (e) {
  e.preventDefault();

  btns.forEach((btn) => {
    btn.classList.remove("nav__list--active");
  });

  layouts.forEach((layout) => {
    layout.style.display = "none";
  });

  this.classList.add("nav__list--active");

  document.querySelector(".locations").style.display = "block";
});

// // // // // // // // // // // // // // // // // // // //

btns[3].addEventListener("click", function (e) {
  e.preventDefault();

  btns.forEach((btn) => {
    btn.classList.remove("nav__list--active");
  });

  layouts.forEach((layout) => {
    layout.style.display = "none";
  });

  this.classList.add("nav__list--active");

  document.querySelector(".game").style.display = "flex";
});

// // // // // // // // // // // // // // // // // // // //
