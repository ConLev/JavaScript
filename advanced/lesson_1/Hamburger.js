class Hamburger {
    constructor(form) {
        this.form = form;
    }

    static render() {
        let price = 0;
        let calories = 0;
        for (let i = 0; i < form.length; i++) {
            if (form[i].checked === true) {
                price += +form[i].value;
                calories += +form[i].dataset.calories;
            }
        }
        document.getElementById('price').innerText = `Стоимость: ${price} рублей`;
        document.getElementById('calories').innerText = `Энергетическая ценность: ${calories} калорий`;
        console.log(price);
        console.log(calories);
    }
}