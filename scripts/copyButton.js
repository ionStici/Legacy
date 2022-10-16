// // // // // // // // // // // // // // // // // // // //
// Copyright functionality

document.querySelector(".current-year").textContent = new Date().getFullYear();

let navCount = 1;

const copyrightBtn = document.querySelector(".copyright-btn");

copyrightBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const open = function () {
    document.querySelector(".nav__note").style.display = "block";
    setTimeout(() => {
      document.querySelector(".nav__note").style.opacity = 1;
    }, 50);

    copyrightBtn.innerHTML = "";
    copyrightBtn.insertAdjacentHTML("afterbegin", "&otimes;");

    copyrightBtn.style.color = "#f03e3e";
    copyrightBtn.style.fontSize = "3rem";
    copyrightBtn.style.padding = "0 1rem";

    --navCount;
  };

  const close = function () {
    copyrightBtn.style.fontSize = "2.2rem";
    copyrightBtn.style.padding = "0.4rem 1rem";
    copyrightBtn.style.color = "#555";

    copyrightBtn.innerHTML = "";
    copyrightBtn.insertAdjacentHTML("afterbegin", "&#169;");

    document.querySelector(".nav__note").style.opacity = 0;
    setTimeout(() => {
      document.querySelector(".nav__note").style.display = "none";
    }, 250);

    ++navCount;
  };

  if (navCount === 1) {
    open();
  } else {
    close();
  }
});

// // // // // // // // // // // // // // // // // // // //
