describe('Возведение в степень', () => {
    it('Проверка возведения 2 в степень 3 (2^3===8)', () => {
        expect(pow(2, 3)).toBe(8);
    });
    it('Проверка возведения 2 в степень 5 (2^5===32)', () => {
        expect(pow(2, 5)).toBe(32);
    });
    it('Проверка возведения 3 в степень 3 (3^3===27)', () => {
        expect(pow(3, 3)).toBe(27);
    })
});
describe('Проверка на нестандартные ситуации', () => {
    it('Проверка на отрицательные значения', () => {
        expect(pow(-2, 5)).toBeNull();
        expect(pow(2, -5)).toBeNull();
        expect(pow(-2, -5)).toBeNull();
    });
    it('Проверка на дробные значения', () => {
        expect(pow(2.1, 5)).toBeNull();
        expect(pow(2, 5.1)).toBeNull();
        expect(pow(2.1, 5.1)).toBeNull();
    });
});