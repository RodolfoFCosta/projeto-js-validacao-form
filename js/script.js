class Validator {

    constructor() {
        this.validations = [
            'data-min-length',
        ]
    }

    //iniciar a validação em todos os campos
    validate(form) {
        //pegar os inpus
        let inputs = form.getElementsByTagName('input');

        // htmlCollection -> array
        let inputArray = [...inputs];


        // loop nos inputs e validação
        inputArray.forEach(function (input) {
            //loop em todas as validaçes existentes
            for (let i = 0; this.validations.length > i; i++) {

                //verifica se a validação atual existe no input
                if (input.getAttribute(this.validations[i]) != null) {

                    //data-min-length -> minlength  | limpando a string para virar um metodo
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    //valor do input
                    let value = input.getAttribute(this.validations[i]);

                    //invoca o metodo
                    this[method](input, value);
                }
            }
        }, this);

    }

    // verifica se um input tem um numero minimo de caracteres
    minlength(input, minValue) {

        let inputLength = input.value.length;

        let errorMessege = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessege);
        }
    }

    // metodo para imprimir msg de error na tela
    printMessage(input, msg) {
        let template = document.querySelector('.error-validation').cloneNode(true);

        template.textContent = msg;

        let inputParent = input.parentNode;

        template.classList.remove('template');

        inputParent.appendChild(template);
    }
}

let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();

//evento que dispara as validações
submit.addEventListener('click', (e) => {
    e.preventDefault();

    validator.validate(form);
});




