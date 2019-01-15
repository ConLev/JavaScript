class ValidForm {
    constructor(name, phone, email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.valid = false;
    }

    init() {
        this._valid_name(this.name.value);
        this._valid_phone(this.phone.value);
        this._valid_email(this.email.value);
        this._is_all_valid();
    }

    _valid_name(name) {
        if (/^[a-zа-яА-ЯЁё]{4,30}$/.test(name)) {
            this.name.classList.add('isValid');
        } else {
            this.name.classList.add('noValid');
            document.getElementById('no_valid_name').innerText = 'Имя должно содержать ' +
                'только буквы (от 4-х до 30-ти)';
        }
    }

    _valid_phone(phone) {
        if (/\+7\([0-9]{3}\)[0-9]{3}-[0-9]{4}/.test(phone)) {
            this.phone.classList.add('isValid');
        } else {
            this.phone.classList.add('noValid');
            document.getElementById('no_valid_phone').innerText = 'Номер телефона должен быть' +
                ' в формате: +7(000)000-0000';
        }
    }

    _valid_email(email) {
        if (/^([a-z]+)([.-]?)([a-z]+)@([a-z]+)\.(com|ru)$/.test(email)) {
            this.email.classList.add('isValid');
        } else {
            this.email.classList.add('noValid');
            document.getElementById('no_valid_email').innerText = 'Адрес электронной почты должен быть' +
                ' в формате: mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru';
        }
    }

    _is_all_valid() {
        if (![...document.querySelectorAll('.noValid')].length) {
            this.valid = true;
        }
    }
}