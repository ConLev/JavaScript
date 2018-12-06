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
                // Записываем ячейку в массив ячеек.
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
};

// Запускаем метод отображения карты.
chess.renderMap();