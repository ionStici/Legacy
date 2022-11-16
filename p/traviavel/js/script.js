// // // // // // // NAVIGATION FUNCTIONALITY // // // // // // //

const navCheckbox = document.querySelector('.nav__checkbox');

const openNav = function () {
    navCheckbox.checked = true;
    document.querySelector('.nav__ul').style.display = 'block';
    document.querySelector('.nav__ul').style.opacity = '1';
};
// openNav();

// prettier-ignore
const checking = function () {
    if (navCheckbox.checked === true) {
        document.querySelector('.nav__ul').style.display = 'none';
        document.querySelector('.nav__ul').style.opacity = '0';
        document.querySelector('body').style.overflow = 'revert';
    }

    if (navCheckbox.checked === false) {
        document.querySelector('.nav__ul').style.display = 'block';
        setTimeout(() => document.querySelector('.nav__ul').style.opacity = '1', 400);
        document.querySelector('body').style.overflow = 'hidden';
    }
};

// prettier-ignore
const btn = document.querySelector('.nav__label').addEventListener('click', function () {
    checking();
});

// prettier-ignore
document.querySelector('.nav__background').addEventListener('click', function () {
    navCheckbox.checked = false;
    document.querySelector('.nav__ul').style.display = 'none';
    document.querySelector('.nav__ul').style.opacity = '0';
    document.querySelector('body').style.overflow = 'revert';
});

// // // // // // // // // // // // // // // // // // // // // // //
// Intro Popup

// // // // // // // // // // // // // // // // // // // // // // //

let i = 0;

if (JSON.parse(localStorage.getItem('messageCount'))) {
    i = JSON.parse(localStorage.getItem('messageCount'));
}

if (i === 4) {
    i = 1;
} else {
    i++;
}

localStorage.setItem('messageCount', JSON.stringify(i));

console.log(i);

// // // // // // // // // // // // // // // // // // // // // // //

const body = document.querySelector('body');
const popupBtn = document.querySelector('.intro-popup__button');
const popupBackground = document.querySelector('.intro-popup__background');
const introPopupBox = document.querySelector('.intro-popup');

const showPopup = function () {
    popupBackground.style.display = 'block';
    introPopupBox.style.display = 'block';
};

const closePopup = function () {
    popupBackground.style.display = 'none';
    introPopupBox.style.display = 'none';
};

const revertOpacity = function () {
    popupBackground.style.opacity = '1';
    introPopupBox.style.opacity = '1';
};

const setOpacity = function () {
    popupBackground.style.opacity = '0';
    introPopupBox.style.opacity = '0';
};

const displayIntroPopup = function () {
    body.style.overflow = 'hidden';
    showPopup();
    setTimeout(revertOpacity, 1);
};

popupBtn.addEventListener('click', function (e) {
    body.style.overflow = 'revert';
    setOpacity();
    setTimeout(closePopup, 300);
});

if (i === 1) {
    // displayIntroPopup();
    setTimeout(displayIntroPopup, 2000);
}

// // // // // // // // // // // // // // // // // // // // // // //
