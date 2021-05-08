let Modal = {

    open() {
        //Abrir modal
        //Adicionar a class active ao modal
        document.querySelector('.modal-overlay')
        .classList.add('active')
    },
    close() {
        //Fechar modal
        //Retirar a class active do modal
        document.querySelector('.modal-overlay')
        .classList.remove('active')
    }
}


const transactions = [

    {
        description: 'luz',
        amount: -20000,
        date: '20/02/2021',
    },

    {
        description: 'Criação de site',
        amount: 200000,
        date: '20/02/2021',
    },

    {
        description: 'internet',
        amount: -20000,
        date: '20/02/2021',
    },
]

const Transaction = {
    all:transactions,

    add(transaction) {
        Transaction.all.push(transaction)
        
        App.reload()
    },

    remove(index) {
        Transaction.all.splice(index, 1)

        App.reload()
    },
    
    incomes() {
        let income = 0;
        transactions.all.forEach(transaction => {
            if( transaction.amount > 0 ) {
                income = income + transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        let expense = 0;
        all.forEach(transaction => {
            if(transaction.amount < 0) {
                expense = expense + transaction.amount;
            }
        })
        return expense;
    },

    total() {
        return transaction.incomes() + transaction.expenses();
    }    
}

const DOM ={
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {

        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date">${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover transação">
        </td>
        `

             return html
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
        
    },

    clearTransactions(){
        DOM.transactionsContainer.innerHTML = ""
    },
} 

const Utils = {
    formatAmount(value) {
        value = Number(value) *100

        return value
    },

    formatDate(date) {
        const splitittedDate = date.split("-")
        return `${splitittedDate[2]}/${splitittedDate[1]}/${splitittedDate[0]}`

    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleEstring("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

const Form = {

    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return{
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value,
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()
        if(description.trim() === "" ||
           amount.trim() === "" ||
           date.trim() === "") {
               throw new Error("Preencha todos os campos!")
           }
    
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()

        amount = Utils.formatAmount(amount)

        date= Utils.formatDate(Date)

        return {
            description,
            amount,
            date
        }
    },

    saveTransaction() {
        Transaction.Add(transaction)
    },

    submit (event) {
        event.preventDefault()

        try {
            Form.validateFields()

            const transaction = Form.formatValues()

            Form.saveTransaction()
            
        } catch (error) {
            alert(error.message)
            
        }
    }
}

const App = {
    init() {
        transactions.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    },
    
}

App.init()

Transaction.remove(0)