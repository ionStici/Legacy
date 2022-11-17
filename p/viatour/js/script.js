const currentAccount = {
    fullName: "Sandra Xulino",
    username: "sandra95",
    password: "lovetravel",
    imgSource: "./img/profile-1.jpg",
};

const profileContainer = document.querySelector(".user-nav__user");

const nameEl = document.querySelector(".user-nav__name");
const img = document.querySelector(".user-nav__img");

const activateUserProfile = function () {
    nameEl.textContent = currentAccount.fullName;
    img.src = currentAccount.imgSource;
};
activateUserProfile();

const changeUserData = function (fullName, img) {
    if (fullName) currentAccount.fullName = fullName;
    if (img) currentAccount.imgSource = img;
    activateUserProfile();
};

// './img/profile-1.jpg';
// './img/fr2.jpg';
// './img/fr1.jpg';
// './img/fr4.jpg';

// // // // // // // // // // // // // // // // //
// Intro Popup Window

const body = document.querySelector("body");
const popupBtn = document.querySelector(".intro-popup__button");
const popupBackground = document.querySelector(".intro-popup__background");
const introPopupBox = document.querySelector(".intro-popup");

const showPopup = function () {
    popupBackground.style.display = "block";
    introPopupBox.style.display = "block";
};

const closePopup = function () {
    popupBackground.style.display = "none";
    introPopupBox.style.display = "none";
};

const revertOpacity = function () {
    popupBackground.style.opacity = "1";
    introPopupBox.style.opacity = "1";
};

const setOpacity = function () {
    popupBackground.style.opacity = "0";
    introPopupBox.style.opacity = "0";
};

const displayIntroPopup = function () {
    body.style.overflow = "hidden";
    showPopup();
    setTimeout(revertOpacity, 1);
};

popupBtn.addEventListener("click", function (e) {
    body.style.overflow = "revert";
    setOpacity();
    setTimeout(closePopup, 300);
});

// // // // // // // // // // // // // // // // //

let i = 0;

if (JSON.parse(localStorage.getItem("messageCount"))) {
    i = JSON.parse(localStorage.getItem("messageCount"));
}

if (i === 4) {
    i = 1;
} else {
    i++;
}

localStorage.setItem("messageCount", JSON.stringify(i));

if (i === 1) {
    // displayIntroPopup();
    setTimeout(displayIntroPopup, 1000);
}

// // // // // // // // // // // // // // // // //
