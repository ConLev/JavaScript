class Validator {
    constructor(form, errorClass = 'error-msg') {
        this.patterns = {
            name: /^[a-zа-яА-ЯЁё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w._-]+@\w+\.\w{2,4}$/i
        };
        this.errors = {
            name: 'Имя содержит только буквы',
            phone: 'Телефон подчиняется шаблону +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.errorClass = errorClass;
        this.form = form;
        this.valid = false;
        this._validateForm(this.form);
    }
    _validateForm(form){
        let errors = [...document.getElementById(form).querySelectorAll(`.${this.errorClass}`)];
        console.log(errors);
        for (let error of errors){
            error.remove();
        }
        let formFields = [...document.getElementById(form).getElementsByTagName('input')];
        for (let field of formFields){
            this._validate(field);
        }
        if(![...document.querySelectorAll('.invalid')].length){
            this.valid = true;
        }
    }
    _validate(field){
        if(this.patterns[field.name]){
            if(!this.patterns[field.name].test(field.value)){
               field.classList.add('invalid');
               this._addErrorMsg(field);
               this._watchField(field);
            }
        }
    }
    _addErrorMsg(field){
        let errMsg = document.createElement('div');
        errMsg.classList.add(this.errorClass);
        errMsg.textContent = this.errors[field.name];
        field.parentNode.appendChild(errMsg);
    }
    _watchField(field){
        field.addEventListener('input', () => {
            if(this.patterns[field.name].test(field.value)){
                field.classList.remove('invalid');
                field.classList.add('valid');
                if(field.parentNode.lastChild !== field){
                    field.parentNode.lastChild.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if (field.parentNode.lastChild.nodeName !== 'DIV'){
                    this._addErrorMsg(field);
                }
            }
        })
    }
}