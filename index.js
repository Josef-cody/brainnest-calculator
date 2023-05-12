class Calculator {
    constructor(dataPre, dataCurr) {
        this.dataPre = dataPre
        this.dataCurr = dataCurr
        this.clear()
    }
    clear() {
        this.currOperand = ''
        this.preOperand = ''
        this.oper = undefined
    }
    //append user input
    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }
    //operation input
    choseOpre(oper) {
        if (this.currOperand === '') return
        if (this.preOperand !== '') {
            this.calculate()
        }
        this.oper = oper
        this.preOperand = this.currOperand
        this.currOperand = ''
    }
    //delete previous number
    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1)
    }
    //calculate number
    calculate() {
        let calculation
        let prev = parseFloat(this.preOperand)
        let current = parseFloat(this.currOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.oper) {
            case '+':
                calculation = prev + current
                break
            case '-':
                calculation = prev - current
                break
            case '*':
                calculation = prev * current
                break
            case '/':
                calculation = prev / current
                break
            default:
                return
        }
        if (Number.isInteger(calculation)) { this.currOperand = calculation }
        else { this.currOperand = Math.round(calculation * 100000) / 100000 }
        this.oper = undefined
        this.preOperand = ''
    }
    //display number and result
    display() {
        this.dataCurr.innerText = this.currOperand
        this.dataPre.innerText = this.preOperand
    }
}

//global variables 
const numberButtons = document.querySelectorAll('[data-number]')
const operButtons = document.querySelectorAll('[data-oper]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const dataPre = document.querySelector('[data-pre]')
const dataCurr = document.querySelector('[data-curr]')


const calculator = new Calculator(dataPre, dataCurr)

//loop out number buttons listener
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.display()
    })
})
//keyboard input listener
document.addEventListener('keydown', (e) => {
    for (let i = 0; i <= 9; i++) {
        switch (e.code) {
            case (`Digit${i}` || `Numpad${i}`):
                calculator.appendNumber(i)
                calculator.display()
                break;
        }
    }
    switch (e.code) {
        case (`Slash` || 'NumpadDivide'):
            calculator.choseOpre('/')
            calculator.display()
            break;
        case (`Minus` || `NumpadSubtract`):
            calculator.choseOpre('-')
            calculator.display()
            break;
        case (`Add` || `NumpadAdd`):
            calculator.choseOpre('+')
            calculator.display()
            break;
        case (`Period` || `NumpadDecimal`):
            calculator.appendNumber('.')
            calculator.display()
            break;
        case (`Multiply` || `NumpadMultiply`):
            calculator.choseOpre('*')
            calculator.display()
            break;
    }
})

//operation button loop
operButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choseOpre(button.innerText)
        calculator.display()
    })
})

//clear display button listener
clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.display()
})

//calculate result button listener
equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.display()
})
document.addEventListener('keydown', (e) => {
    if (e.code == 'Equal' || e.code == 'NumpadEqual') {
        calculator.calculate()
        calculator.display()
    }
})

//delete button listener
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.display()
})
document.addEventListener('keydown', (e) => {
    if (e.code == 'Backspace' || e.code == 'NumpadDel') {
        calculator.delete()
        calculator.display()
    }
})

