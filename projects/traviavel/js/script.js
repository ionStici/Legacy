// // // // // // // NAVIGATION FUNCTIONALITY // // // // // // //

const navCheckbox = document.querySelector('.nav__checkbox');

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
