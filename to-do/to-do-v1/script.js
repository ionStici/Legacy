'use strict';

// To Do App

// Add Dates and time to each todo
// Make a search engine ?
// Notes by hash tags
// Only colors and gradients, no images

// iPhone Se 2016 -320px × 568px

class App {
    uncheckedContainer = document.querySelector('.app__unchecked');
    checkedContainer = document.querySelector('.app__checked');

    form = document.querySelector('.app__input__form');
    input = document.querySelector('.app__input__text-box');
    button = document.querySelector('.app__input__button');

    #uncheckedTodos = [];
    #checkedTodos = [];

    #html = '';
    #html2 = '';

    constructor() {
        this.form.addEventListener('submit', this._submit.bind(this));
        this.button.addEventListener('click', this._submit.bind(this));

        this.uncheckedContainer.addEventListener(
            'click',
            this._checked.bind(this)
        );

        this.checkedContainer.addEventListener(
            'click',
            this._unchecked.bind(this)
        );

        this.input.addEventListener('onfocus', this._inputFocus.bind(this));
    }

    _inputFocus(e) {
        e.preventDefault();

        this.input.style.border = '';
    }

    _submit(e) {
        e.preventDefault();

        this.#uncheckedTodos.push(this.input.value);
        this.input.value = '';

        this._fillUnchecked();
    }

    _fillUnchecked() {
        // e.preventDefault();

        this.uncheckedContainer.innerHTML = '';

        this.#html = '';

        this.#uncheckedTodos.forEach((item, i, arr) => {
            this.#html += `
            <p class="app__item" data-row="${i}">
                <span class="app__item--check-box"></span>
                <span class="app__item--text">${item}</span>
                <span class="app__item--edit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 app__item--edit-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </span>
            </p>`;
        });

        this.uncheckedContainer.insertAdjacentHTML('afterbegin', this.#html);
    }

    _fillChecked() {
        this.checkedContainer.innerHTML = '';

        this.#html2 = '';

        this.#checkedTodos.forEach((item, i, arr) => {
            this.#html2 += `
            <p class="app__item item-checked" data-row="${i}">
                <span class="app__item--check-box check-box-checked"></span>
                <span class="app__item--text text-checked">${item}</span>
                <span class="app__item--edit edit-checked">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 app__item--edit-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </span>
            </p>`;
        });

        this.checkedContainer.insertAdjacentHTML('afterbegin', this.#html2);
    }

    _checked(e) {
        if (
            e.target ===
                e.target
                    .closest('.app__item')
                    .querySelector('.app__item--text') ||
            e.target === e.target.closest('.app__item') ||
            e.target ===
                e.target
                    .closest('.app__item')
                    .querySelector('.app__item--check-box')
        ) {
            const todo = e.target.closest('.app__item');

            const index = todo.dataset.row;

            const removed = this.#uncheckedTodos.splice(index, 1).join('');

            this.#checkedTodos.unshift(removed);

            // todo.style.transform = 'scale(0)';
            todo.style.opacity = '0';

            setTimeout(() => {
                this._fillUnchecked();
                this._fillChecked();
            }, 1000 * 0.25);
        }
    }

    _unchecked(e) {
        if (
            e.target ===
                e.target
                    .closest('.app__item')
                    .querySelector('.app__item--text') ||
            e.target === e.target.closest('.app__item') ||
            e.target ===
                e.target
                    .closest('.app__item')
                    .querySelector('.app__item--check-box')
        ) {
            const todo = e.target.closest('.app__item');

            const index = todo.dataset.row;

            const removed = this.#checkedTodos.splice(index, 1).join('');

            this.#uncheckedTodos.unshift(removed);

            // todo.style.transform = 'scale(0)';
            todo.style.opacity = '0';

            setTimeout(() => {
                this._fillUnchecked();
                this._fillChecked();
            }, 1000 * 0.25);
        }
    }
}

const app = new App();
