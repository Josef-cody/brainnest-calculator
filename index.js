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
    appendNumber(number) {
        if (number === '.' && this.currOperand.includes('.')) return
        this.currOperand = this.currOperand.toString() + number.toString()
    }
    choseOpre(oper) {
        if (this.currOperand === '') return
        if (this.preOperand !== '') {
            this.calculate()
        }
        this.oper = oper
        this.preOperand = this.currOperand
        this.currOperand = ''
    }
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
    display() {
        this.dataCurr.innerText = this.currOperand
        this.dataPre.innerText = this.preOperand

    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operButtons = document.querySelectorAll('[data-oper]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const dataPre = document.querySelector('[data-pre]')
const dataCurr = document.querySelector('[data-curr]')

const calculator = new Calculator(dataPre, dataCurr)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.display()
    })
})
document.addEventListener('keypress', (e) => {
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

operButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.choseOpre(button.innerText)
        calculator.display()
    })
})

clearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.display()
})

equalsButton.addEventListener('click', button => {
    calculator.calculate()
    calculator.display()
})
document.addEventListener('keypress', (e) => {
    if(e.code=='Equal' || e.code =='Enter' || e.code == 'NumpadEqual'){
        calculator.calculate()
        calculator.display()
    }
})
