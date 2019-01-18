class Feedback {
    constructor(source, container = '.reviews') {
        this.source = source;
        this.container = container;
        this.reviewsItems = []; // Все отзывы
        this._init();
    }

    _init() {
        $('.reviews').on('click', '.approve', e => {
            this._approveReview(e.currentTarget);
        });
        fetch(this.source)
            .then(result => result.json())
            .then(data => {
                for (let review of data) {
                    this.reviewsItems.push(review);
                    this._renderItem(review);
                }
            })
    }

    _renderItem(review) {
        let $container = $('<div/>', {
            class: 'review',
            'data-review': review.id
        });
        $container.append($(`<span class="review-author">${review.author}</span>`));
        $container.append($(`<p class="review-text">${review.text}</p>`));
        if (!review.approved) {
            $container.addClass('no_publish');
        }
        let $reviewSubmit = $('<button/>', {
            class: 'approve',
            text: 'Approve',
            'data-id': review.id,
            'data-approved': review.approved
        });
        $container.append($reviewSubmit);
        $container.appendTo($('.reviews'));
    }

    addReview(name, text) {
        if (name !== '' && text !== '') {
            let review = {
                id: this.reviewsItems.length + 1,
                author: name,
                text: text,
                approved: false
            };
            this.reviewsItems.push(review);
            this._renderItem(review);
        }
    }

    _approveReview(id) {
        let reviewId = +$(id).data('id');
        let find = this.reviewsItems.find(review => review.id === reviewId);
        find.approved = true;
        if (!$(id).data('approved')) {
            id.parentElement.remove();
            this._renderItem(find);
        }
    }
}