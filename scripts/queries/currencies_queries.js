
const currencies = [
    {
        symbol: "$",
        exchange: 1
    },{
        symbol: "₡",
        exchange: 528.82 
    },{
        symbol: "€",
        exchange: 0.92
    }
]

const _retrieveCurrencies = () => {
    return currencies;
}

const _getCurrencyIdBySymbol = (symbol) => {
    return currencies.findIndex(eachCurrency => symbol === eachCurrency.symbol);    
}

const _getCurrencyBySymbol = (symbol) => {
    return currencies.find(eachCurrency => symbol === eachCurrency.symbol);
}

const _exchangeCurrencyExpense = (baseAmount, budget) => {
    let amount = { ...baseAmount };
    if(baseAmount.currency.symbol !== budget.currency.symbol){
        amount.value = baseAmount.value/amount.currency.exchange;
        amount.value = amount.value*budget.currency.exchange;
        amount.currency = budget.currency;
    }
    return amount
}