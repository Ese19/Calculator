class Calculator {
    constructor(previous, current) {
        this.previous = previous
        this.current = current
        this.clear()
    }

    clear(){
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    selectOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let result
        let prevNum = parseFloat(this.previousOperand)
        let currNum = parseFloat(this.currentOperand)
        if(isNaN(prevNum) || isNaN(currNum)) return

        switch(this.operation){
            case '+':
                result = prevNum + currNum
                break

            case '-':
                result = prevNum - currNum
                break

            case '*':
                result = prevNum * currNum
                break

            case '÷':
                result = prevNum / currNum
                break
            default:
                return

        }
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay(){
        this.current.textContent = this.currentOperand
        if(this.operation != null){

            this.previous.textContent = `${this.previousOperand} ${this.operation}`
        } else {
            this.previous.textContent = ''
        }
    }
}




const operators = document.querySelectorAll('[data-operation]')
const numbers = document.querySelectorAll('[data-number]')
const equal = document.querySelector('[data-equal]')
const clear = document.querySelector('[data-clear]')
const previous = document.querySelector('[data-previous]')
const current = document.querySelector('[data-current]')

const calculator = new Calculator(previous, current)

numbers.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })
});


operators.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.textContent)
        calculator.updateDisplay()
    })
});

equal.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
});

clear.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})