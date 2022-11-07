const panels = document.querySelectorAll(".panel");

const removeActive = function () {
  panels.forEach((panel) => {
    panel.classList.remove("active");
  });
};

panels.forEach((panel) => {
  panel.addEventListener("click", function () {
    removeActive();
    panel.classList.add("active");
  });
});
