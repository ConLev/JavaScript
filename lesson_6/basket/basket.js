"use strict";

/**
 * @property {object} settings Настройки корзины товаров.
 * @property {{price: number, name: string}[]} goods Список товаров что купил пользователь.
 * @property {HTMLElement} basketCountEl Место для показа количества товаров.
 * @property {HTMLElement} basketPriceEl Место для показа цены всех товаров.
 */
const basket = {
    settings: {
        countSelector: '#basket-count',
        priceSelector: '#basket-price',
    },

    goods: [],
    countEl: null,
    priceEl: null,

    /**
     * Инициализирует переменные для корзины и показывает эти значения.
     */
    init(settings = {}) {
        this.countEl = document.querySelector(this.settings.countSelector);
        this.priceEl = document.querySelector(this.settings.priceSelector);
        const buttons = document.querySelectorAll('.buy-btn');
        for (let i = 0; i < buttons.length; i++) {
            // noinspection JSUnresolvedVariable
            buttons[i].addEventListener('click', event => this.add(event.target.dataset.name,
                +event.target.dataset.price));
        }
    },

    /**
     * Отображает количество всех товаров и их цену. */
    render() {
        this.countEl.textContent = this.goods.length;
        this.priceEl.textContent = (this.getGoodsPrice() + ' руб.');
    },

    /**
     * Считает и возвращает цену всех купленных товаров из массива goods.
     * @returns {number} Цену всех купленных товаров.
     */
    getGoodsPrice() {
        let totalPrice = 0;
        for (let goods of this.goods) {
            totalPrice += goods.price;
        }
        return totalPrice;
    },

    /**
     * Добавляет купленный товар в массив купленных товаров и отображает количество и цену всех товаров.
     * @param goodName Название товара.
     * @param goodPrice Цена товара.
     */
    add(goodName, goodPrice) {
        this.goods.push({name: goodName, price: goodPrice});
        this.render();
    },
};

basket.init({});