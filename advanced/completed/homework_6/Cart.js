class Cart {
    constructor(source, container = '#cart') {
        this.source = source;
        this.container = container;
        this.countGoods = 0; // Общее кол-во товаров в корзине
        this.amount = 0; // Общая стоимость товаров в корзине
        this.cartItems = []; //Массив для хранения товаров
        this._init(this.source);
    }

    _render() {
        let $cartItemsDiv = $('<div/>', {
            class: 'cart-items-wrap'
        });
        let $totalGoods = $('<div/>', {
            class: 'cart-summary sum-goods'
        });
        let $totalAmount = $('<div/>', {
            class: 'cart-summary sum-price'
        });
        $(this.container).text('Корзина');
        $cartItemsDiv.appendTo($(this.container));
        $totalGoods.appendTo($(this.container));
        $totalAmount.appendTo($(this.container));
        $(this.container).droppable({
            drop: (event, ui) => {
                this.addProduct(ui.draggable.find('.buyBtn'));
            }
        });
    }

    _init(source) {
        this._render();
        if (!localStorage.getItem('mycart')) {
            fetch(source)
                .then(result => result.json())
                .then(data => {
                    for (let product of data.contents) {
                        this.cartItems.push(product);
                        this._renderItem(product);
                    }
                    this.countGoods = data.countGoods;
                    this.amount = data.amount;
                    localStorage.setItem('mycart', JSON.stringify(this.cartItems));
                    localStorage.setItem('amount', JSON.stringify(this.amount));
                    localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
                    this._renderSum();
                })
        } else {
            this.cartItems = JSON.parse(localStorage.getItem('mycart'));
            for (let product of this.cartItems) {
                this._renderItem(product);
            }
            this.amount = JSON.parse(localStorage.getItem('amount'));
            this.countGoods = JSON.parse(localStorage.getItem('countGoods'));
            this._renderSum();
        }

    }

    _renderItem(product) {
        let $container = $('<div/>', {
            class: 'cart-item',
            'data-product': product.id_product
        });
        $container.append($(`<p class="product-name">${product.product_name}</p>`));
        $container.append($(`<p class="product-quantity">${product.quantity}</p>`));
        $container.append($(`<p class="product-price">${product.price} руб.</p>`));
        let $delBtn = $('<button class="delBtn">&times;</button>');
        $container.append($delBtn);
        $delBtn.click(() => {
            this._remove(product.id_product);
        });
        $container.appendTo($('.cart-items-wrap'));
    }

    _renderSum() {
        $('.sum-goods').text(`Всего товаров в корзине: ${this.countGoods}`);
        $('.sum-price').text(`Общая сумма: ${this.amount} руб.`);
    }

    _updateCart(product) {
        let $container = $(`div[data-product=${product.id_product}]`);
        $container.find('.product-quantity').text(product.quantity);
        $container.find('.product-price').text(`${product.quantity * product.price} руб.`);
    }

    addProduct(element) {
        let productId = +$(element).data('id');
        let find = this.cartItems.find(product => product.id_product === productId);
        if (find) {
            find.quantity++;
            this.countGoods++;
            this.amount += find.price;
            this._updateCart(find);
        } else {
            let product = {
                id_product: productId,
                product_name: $(element).data('name'),
                price: +$(element).data('price'),
                quantity: 1
            };
            this.cartItems.push(product);
            this.amount += product.price;
            this.countGoods += product.quantity;
            this._renderItem(product);
        }
        localStorage.setItem('mycart', JSON.stringify(this.cartItems));
        localStorage.setItem('amount', JSON.stringify(this.amount));
        localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
        this._renderSum();
    }

    _remove(idProduct) {
        let find = this.cartItems.find(product => product.id_product === idProduct);
        if (find.quantity > 1) {
            find.quantity--;
            this._updateCart(find);
        } else {
            this.cartItems.splice(this.cartItems.indexOf(find), 1);
            $(`div[data-product=${idProduct}]`).remove();
        }
        this.countGoods--;
        this.amount -= find.price;
        localStorage.setItem('mycart', JSON.stringify(this.cartItems));
        localStorage.setItem('amount', JSON.stringify(this.amount));
        localStorage.setItem('countGoods', JSON.stringify(this.countGoods));
        this._renderSum();
    }
}