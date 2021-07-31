let element = document.querySelector('.element');


class Check {
    constructor() {
        this.checked = false;
    }
    createEl() {
        this.el = document.createElement('div');
        this.el.classList.add('check');
        this.el.addEventListener('click', function(e) {
            console.log(this);
        })
        element.appendChild(this.el);


    }
}

let check = new Check();

check.createEl();