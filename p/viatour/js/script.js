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
