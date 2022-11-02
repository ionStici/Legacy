const navCheckbox = document.querySelector('.nav__checkbox');

const checking = function () {
    if (navCheckbox.checked === true) {
        document.querySelector('.nav__ul').style.display = 'none';

        document.querySelector('.nav__background').style.display = 'none';
        setTimeout(() => {
            document.querySelector('.nav__background').style.display = 'block';
        }, 1);
    }

    if (navCheckbox.checked === false) {
        document.querySelector('.nav__ul').style.display = 'block';
    }
};

// prettier-ignore
const btn = document.querySelector('.nav__label').addEventListener('click', function () {
    checking();
});

// prettier-ignore
// document.querySelector('.nav__background').addEventListener('click', function() {
//     navCheckbox.checked = false;
//     checking();
// })
