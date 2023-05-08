const add = (a, b) => {
    return a + b;
}
const subtract = (a, b) => {
    return a - b;
}
const multiply = (o, a, b) => {
    return a * b;
}
const divide = (a, b) => {
    return a / b;
}

const operate = (operator) => {
    switch (operator) {
        case "+":
            add();
            break;
        case "-":
            subtract();
            break;
        case "*":
            multiply();
            break;
        case "/":
            divide();
            break;
        default:
    }
}

let userInput = document.getElementById('user_input');
let result = document.getElementById('result');
let display_value = document.getElementsByTagName('button');

for (let i = 0; i < display_value.length; i++) {
    display_value[i].addEventListener('click', () => {
        let userinput = display_value[i].value;
        userInput.innerText = userInput.innerText + userinput
    })
}

function clearDisplay(){
    userInput.innerText = "";
    result.innerText = "";
}
