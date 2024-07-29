
const EMPTY_AMOUNT = {
    value: 0
}

function getCategoryMostSpentOn (categories){
    if (categories.length !== 0){
        let mostSpentCategory = categories[0];
        categories.slice(1).forEach(category => {
            if(category.amount > mostSpentCategory.amount){
                mostSpentCategory = category;
            }
        })
        return mostSpentCategory;
    }else{
        return {
            name: "N/A"
        }
    }
}

const retrieveBudget = () => {
    const budget = _retrieveBudget();
    const currencyId = _getCurrencyIdBySymbol(budget.currency.symbol);
    htmlUtils.renderBudget(currencyId, budget);
}

const updateBudget = () => {
    const budgetData = htmlUtils.retrieveBudget();

    const currencyData = {
        data: _getCurrencyBySymbol(budgetData.currency),
        id: _getCurrencyIdBySymbol(budgetData.currency)
    }

    if(!isNaN(budgetData.amount)){
        _updateBudget(
            currencyData,
            parseFloat(budgetData.amount)
        )
    }else{
        _updateBudget(
            currencyData,
            null
        )
    }
    updateExchangeCurrency();
    updateStatistics();
}

const updateStatistics = () => {
    const expenses = _retrieveExpenses();
    const budget = _retrieveBudget();

    let statistics = {
        categories :[],
        totalAmount: 0
    }

    expenses.forEach(element => {
        const categoryIndex = statistics.categories.findIndex(category => category.name === element.category);
        if(categoryIndex === -1){
            statistics.categories.push({
                name: element.category,
                amount: element.amount,
                count: 1
            })
        }else{
            statistics.categories[categoryIndex].amount.value += element.amount.value;
            statistics.categories[categoryIndex].count += 1;
        }
        statistics.totalAmount += element.amount.value;
    });

    const amountSpent = {
        currency: budget.currency,
        value: statistics.totalAmount
    }

    const mostSpentCategory = getCategoryMostSpentOn(statistics.categories);

    if(budget.amount === NaN){
        const noLeftBudget = {
            ...EMPTY_AMOUNT,
            currency: budget.currency
        }

        htmlUtils.renderStatistics(statistics, amountSpent, noLeftBudget, mostSpentCategory);

    }else{    
        const budgetLeft = {
            currency: budget.currency,
            value: budget.amount - statistics.totalAmount
        }
    
        htmlUtils.renderStatistics(statistics, budgetLeft, amountSpent, mostSpentCategory);
    }
}
