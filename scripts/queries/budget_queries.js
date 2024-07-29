const budgetKey = 'budget';



const _retrieveBudget = () => {
    const currencies = _retrieveCurrencies();

    let budget = localStorageUtil.retrieveDataFromLocalStorage(budgetKey);
    if(!!!budget){
        budget = {
            currency: currencies[0],
            amount: null
        }
        localStorageUtil.saveDataToLocalStorage(budgetKey, budget)
    }
    return budget;
}

const _updateBudget = (currency, amount) => {
    const budget = {
        amount,
        currency: currency.data
    }

    htmlUtils.renderBudget(currency.id, budget)

    console.log(budget)
    localStorageUtil.saveDataToLocalStorage(budgetKey, budget)
}
