"use strict";

/**
 * @property {HTMLElement} gameContainerEl Контейнер игры (DOM элемент).
 */
const chess = {
    gameContainerEl: document.getElementById('game'),

    /**
     * Метод отображения карты (игрового поля).
     */
    renderMap() {

        // Очищаем контейнер для игры.
        this.gameContainerEl.innerHTML = '';
        // Массив ячеек пока пуст.
        this.cellElements = [];
        const cellInnerLet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const cellInnerDig = [8, 7, 6, 5, 4, 3, 2, 1];
        // Пробегаемся в цикле столько раз, какое количество строк в игре.
        for (let row = 0; row < 10; row++) {
            // Создаем новую строку.
            const trElem = document.createElement('tr');
            // Добавляем строку в контейнер с игрой.
            this.gameContainerEl.appendChild(trElem);
            // В каждой строке пробегаемся по циклу столько раз, сколько у нас колонок.
            for (let col = 0; col < 10; col++) {
                // Создаем ячейку.
                const cell = document.createElement('td');
                if (row === 0 && col > 0 && col < 9 || row === 9 && col > 0 && col < 9) {
                    cell.innerText = cellInnerLet[col - 1];
                    cell.bgColor = '#eee';
                } else if (col === 0 && row > 0 && row < 9 || col === 9 && row > 0 && row < 9) {
                    // noinspection JSValidateTypes
                    cell.innerText = cellInnerDig[row - 1];
                    cell.bgColor = '#eee';
                } else if (this.isCellIsBlack(row, col)) {
                    cell.bgColor = '#777';
                } else {
                    cell.bgColor = '#eee';
                }
                // Присваиваем ячейке индекс.
                if (col > 0 && col < 9) {
                    cell.accessKey = cellInnerLet[col - 1] + (9 - row);
                }
                // Записываем ячейку в массив.
                this.cellElements.push(cell);
                // Добавляем ячейку в текущую строку.
                trElem.appendChild(cell);
            }
        }
    },

    /**
     * Определяет является ли ячейка черной.
     * @param {int} rowNum Номер в строке.
     * @param {int} colNum Номер в колонке.
     * @returns {boolean} true, если ячейка должна быть черной, иначе false.
     */
    isCellIsBlack(rowNum, colNum) {
        if (rowNum % 2 !== 0 && colNum % 2 === 0 && rowNum < 9 ||
            rowNum % 2 === 0 && colNum % 2 !== 0 && rowNum > 0) {
            return true;
        }
    },

    /**
     * Массив, который содержит шахматные фигуры.
     * name - полное название фигуры.
     * color - цвет фигуры.
     * pos - позиция фигуры.
     * abbr - первая буква названия фигуры
     */
    figures: [
        {abbr: 'p', color: 'w', pos: 'a2', name: 'pawn white (пешка белая)'},
        {abbr: 'p', color: 'w', pos: 'b2', name: 'pawn white (пешка белая)'},
        {abbr: 'p', color: 'w', pos: 'c2', name: 'pawn white (пешка белая)'},
        {abbr: 'p', color: 'w', pos: 'd2', name: 'pawn white (пешка белая)'},
        {abbr: 'p', color: 'w', pos: 'e2', name: 'pawn white (пешка белая)'},
        {abbr: 'p', color: 'w', pos: 'f2', name: 'pawn white (пешка белая)'},
        {abbr: 'p', color: 'w', pos: 'g2', name: 'pawn white (пешка белая)'},
        {abbr: 'p', color: 'w', pos: 'h2', name: 'pawn white (пешка белая)'},
        {abbr: 'p', color: 'b', pos: 'a7', name: 'pawn black (пешка чёрная)'},
        {abbr: 'p', color: 'b', pos: 'b7', name: 'pawn black (пешка чёрная)'},
        {abbr: 'p', color: 'b', pos: 'c7', name: 'pawn black (пешка чёрная)'},
        {abbr: 'p', color: 'b', pos: 'd7', name: 'pawn black (пешка чёрная)'},
        {abbr: 'p', color: 'b', pos: 'e7', name: 'pawn black (пешка чёрная)'},
        {abbr: 'p', color: 'b', pos: 'f7', name: 'pawn black (пешка чёрная)'},
        {abbr: 'p', color: 'b', pos: 'g7', name: 'pawn black (пешка чёрная)'},
        {abbr: 'p', color: 'b', pos: 'h7', name: 'pawn black (пешка чёрная)'},
        {abbr: 'r', color: 'w', pos: 'a1', name: 'rook white (ладья белая)'},
        {abbr: 'r', color: 'w', pos: 'h1', name: 'rook white (ладья белая)'},
        {abbr: 'r', color: 'b', pos: 'a8', name: 'rook black (ладья чёрная)'},
        {abbr: 'r', color: 'b', pos: 'h8', name: 'rook black (ладья чёрная)'},
        {abbr: 'n', color: 'w', pos: 'b1', name: 'knight white (конь белый)'},
        {abbr: 'n', color: 'w', pos: 'g1', name: 'knight white (конь белый)'},
        {abbr: 'n', color: 'b', pos: 'b8', name: 'knight black (конь чёрный)'},
        {abbr: 'n', color: 'b', pos: 'g8', name: 'knight black (конь чёрный)'},
        {abbr: 'b', color: 'w', pos: 'c1', name: 'bishop white (слон белый)'},
        {abbr: 'b', color: 'w', pos: 'f1', name: 'bishop white (слон белый)'},
        {abbr: 'b', color: 'b', pos: 'c8', name: 'bishop black (слон чёрный)'},
        {abbr: 'b', color: 'b', pos: 'f8', name: 'bishop black (слон чёрный)'},
        {abbr: 'q', color: 'w', pos: 'd1', name: 'queen white (королева белая)'},
        {abbr: 'q', color: 'b', pos: 'd8', name: 'queen black (королева чёрная)'},
        {abbr: 'k', color: 'w', pos: 'e1', name: 'king white (король белый)'},
        {abbr: 'k', color: 'b', pos: 'e8', name: 'king black (король чёрный)'},

    ],

    /**
     * Свойство, которое содержит информацию о том, как выводить фигуры.
     */
    figureHtml: {
        pw: '&#9817;',
        pb: '&#9823;',
        rw: '&#9814;',
        rb: '&#9820;',
        nw: '&#9816;',
        nb: '&#9822;',
        bw: '&#9815;',
        bb: '&#9821;',
        qw: '&#9813;',
        qb: '&#9819;',
        kw: '&#9812;',
        kb: '&#9818;',
    },

    /**
     * Метод, который отображает все фигуры на поле.
     */
    renderFigures() {
        // Берем из массива одну фигуру
        for (const figure of this.figures) {
            // Получаем имя фигуры и цвет в одну строку.
            const figureHtmlProperty = figure.abbr + figure.color;
            // Получаем код фигуры из this.figureHtml используя строку из аббревиатуры фигуры и ее цвета.
            const figureCode = this.figureHtml[figureHtmlProperty];
            //console.log(`${figureCode}`);
            for (const cellElement of this.cellElements) {
                if (figure.pos === cellElement.accessKey) {
                    cellElement.innerHTML = figureCode;
                }
            }
        }
    },
};

// Запускаем метод отображения карты.
chess.renderMap();
//Запускаем метод отображения фигур.
chess.renderFigures();