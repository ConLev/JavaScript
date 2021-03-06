"use strict";

/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.previewSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.openedImageWrapperClass Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageNextBtnClass Класс для картинки кнопки следующая картинка.
 * @property {string} settings.openedImageBackBtnClass Класс для картинки кнопки предыдущая картинка.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки закрыть.
 * @property {string} settings.openedImageNextBtnSrc Путь до картинки кнопки следующая картинка.
 * @property {string} settings.openedImageBackBtnSrc Путь до картинки кнопки предыдущая картинка.
 * @property {string} settings.notFoundImage Путь до картинки заглушки.
 */
const gallery = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageNextBtnClass: 'galleryWrapper__next',
        openedImageBackBtnClass: 'galleryWrapper__back',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
        openedImageNextBtnSrc: 'images/gallery/next.png',
        openedImageBackBtnSrc: 'images/gallery/back.png',
        notFoundImage: 'images/gallery/404.jpg',
    },

    /**
     * {Element} - Элемент миниатюры - картинки, которую мы открыли.
     */
    openedImageEl: {},

    /**
     * Инициализирует галерею, ставит обработчик события.
     * @param {Object} userSettings Объект настроек для галереи.
     */
    init(userSettings = {}) {
        // Записываем настройки, которые передал пользователь в наши настройки.
        Object.assign(this.settings, userSettings);

        // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
        // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
        // gallery и передадим туда событие MouseEvent, которое случилось.
        document
            .querySelector(this.settings.previewSelector)
            .addEventListener('click', event => this.containerClickHandler(event));
    },

    /**
     * Обработчик события клика для открытия картинки.
     * @param {Event} event Событие клики мышью.
     * @param {HTMLElement} event.target Целевой объект, куда был произведен клик.
     */
    containerClickHandler(event) {
        // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
        // noinspection JSUnresolvedVariable
        if (event.target.tagName !== 'IMG') {
            return;
        }
        // Открываем картинку с полученным из целевого тега (data-full_image_url аттрибут).
        // noinspection JSUnresolvedVariable
        this.openImage(event.target.dataset.full_image_url);
        this.openedImageEl = event.target;
    },

    /**
     * Открывает картинку.
     * @param {string} src Ссылка на картинку, которую надо открыть.
     */
    openImage(src) {
        // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.
        this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;
        this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).alt = '';
    },

    /**
     * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
     * @returns {Element}
     */
    getScreenContainer() {
        // Получаем контейнер для открытой картинки.
        const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
        // Если контейнер для открытой картинки существует - возвращаем его.
        if (galleryWrapperElement) {
            return galleryWrapperElement;
        }

        // Возвращаем полученный из метода createScreenContainer контейнер.
        return this.createScreenContainer();
    },

    /**
     * Создает контейнер для открытой картинки.
     * @returns {HTMLElement}
     */
    createScreenContainer() {
        // Создаем сам контейнер-обертку и ставим ему класс.
        const galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
        const galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
        const closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.alt = 'close';
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        // Создаем картинку для кнопки следующая картинка, ставим класс, src и добавляем ее в контейнер-обертку.
        const nextImageElement = new Image();
        nextImageElement.classList.add(this.settings.openedImageNextBtnClass);
        nextImageElement.src = this.settings.openedImageNextBtnSrc;
        nextImageElement.alt = 'next';
        nextImageElement.addEventListener('click', () => this.getNextImage());
        galleryWrapperElement.appendChild(nextImageElement);

        // Создаем картинку для кнопки предыдущая картинка, ставим класс, src и добавляем ее в контейнер-обертку.
        const backImageElement = new Image();
        backImageElement.classList.add(this.settings.openedImageBackBtnClass);
        backImageElement.src = this.settings.openedImageBackBtnSrc;
        backImageElement.alt = 'previous';
        backImageElement.addEventListener('click', () => this.getPrevImage());
        galleryWrapperElement.appendChild(backImageElement);

        // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
        const image = new Image();
        // Если картинка не доступна, выводим заглушку.
        image.onerror = () => image.src = this.settings.notFoundImage;
        image.classList.add(this.settings.openedImageClass);
        galleryWrapperElement.appendChild(image);

        // Добавляем контейнер-обертку в тег body.
        document.body.appendChild(galleryWrapperElement);

        // Возвращаем добавленный в body элемент, наш контейнер-обертку.
        return galleryWrapperElement;
    },

    /**
     * Закрывает (удаляет) контейнер для открытой картинки.
     */
    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },

    /**
     * Возвращает следующий элемент (картинку) от открытой или первую картинку в контейнере,
     * если текущая открытая картинка последняя.
     * @returns {Element} Следующую картинку от текущей открытой.
     */
    getNextImage() {
        if (this.openedImageEl.nextElementSibling === null) {
            // noinspection JSUnresolvedVariable
            this.openImage(this.openedImageEl.parentNode.firstElementChild.dataset.full_image_url);
            return this.openedImageEl = this.openedImageEl.parentNode.firstElementChild;
        }
        this.openImage(this.openedImageEl.nextElementSibling.dataset.full_image_url);
        this.openedImageEl = this.openedImageEl.nextElementSibling;
    },

    /**
     * Возвращает предыдущий элемент (картинку) от открытой или последнюю картинку в контейнере,
     * если текущая открытая картинка первая.
     * @returns {Element} Предыдущую картинку от текущей открытой.
     */
    getPrevImage() {
        if (this.openedImageEl.previousElementSibling === null) {
            // noinspection JSUnresolvedVariable
            this.openImage(this.openedImageEl.parentNode.lastElementChild.dataset.full_image_url);
            return this.openedImageEl = this.openedImageEl.parentNode.lastElementChild;
        }
        this.openImage(this.openedImageEl.previousElementSibling.dataset.full_image_url);
        this.openedImageEl = this.openedImageEl.previousElementSibling;
    },
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});