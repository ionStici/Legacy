const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");
const progressBar = document.querySelector(".progress");
const circle = document.querySelectorAll(".circle");

let currentActive = 1;

btnPrev.addEventListener("click", function () {
  if (currentActive > 1) currentActive--;
  update();
});

btnNext.addEventListener("click", function () {
  if (currentActive < circle.length) currentActive++;
  update();
});

const update = function () {
  circle.forEach((circle, i) => {
    if (i < currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  const actives = document.querySelectorAll(".active");
  // prettier-ignore
  progressBar.style.width = `${((actives.length - 1) / (circle.length - 1)) * 99}%`;

  if (currentActive > 1) btnPrev.removeAttribute("disabled");
  if (currentActive < circle.length) btnNext.removeAttribute("disabled");
  if (currentActive === 1) btnPrev.disabled = "disabled";
  if (currentActive === circle.length) btnNext.disabled = "disabled";
};
