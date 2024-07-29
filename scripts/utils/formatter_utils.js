
const formatDateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}

const formatDate = (date) => {
    const correctDate = new Date(date)
    correctDate.setDate(correctDate.getDate() + 1)

    return correctDate.toLocaleDateString('en-US', formatDateOptions);
}

const formatAmount = (amount) => {

    let sign = ""

    if(amount.value < 0){
        sign += "-"
        amount.value = -amount.value
    }

    return sign + amount.currency.symbol + parseFloat(amount.value).toFixed(2);
}

const formatBudget = (budget) => {
    return parseFloat(budget.amount).toFixed(2);
}