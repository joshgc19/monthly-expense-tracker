

const updateCategoryExpenses = (oldCategory, newCategory) => {
    let expenses = _retrieveExpenses();
    expenses = expenses.map(expense => {
        if(expense.category === oldCategory){
            return {
                ...expense,
                category: newCategory
            }
        }else{
            return expense
        }
    })

    htmlUtils.renderExpenses(expenses);
    _updateExpensesData(expenses);
}

const retrieveExpenses = () => {
    const expenses  = _retrieveExpenses();
    htmlUtils.renderExpenses(expenses);
}

const retrieveExpenseById = (id) => {
    return _retrieveExpenses()[id]
}

const addExpense = () => {
    const expenseData = htmlUtils.retrieveNewExpenseData();

    // CHECK DATA
    try{
        validateExpense(expenseData)
    }catch(err){
        alert(err.message);
        return;
    }

    expenseData.baseAmount.value = parseFloat(expenseData.baseAmount.value);
    expenseData.amount = _exchangeCurrencyExpense(expenseData.baseAmount, _retrieveBudget())

    const expenses = _addExpense(expenseData);

    htmlUtils.renderExpenses(expenses);
    hideModal('add-expense-modal');
    htmlUtils.clearNewExpense();    
    updateStatistics();
}

const deleteExpense = (id) => {
    const expenses = _deleteExpense(id);
    htmlUtils.renderExpenses(expenses);
    updateStatistics();
}

const isCategoryBeingUsed = (category) => {
    const expenses = _retrieveExpenses();
    return expenses.filter(expense => expense.category === category).length > 0;
}

const updateExpense = () => {
    const {expense, id} = htmlUtils.retrieveEditExpenseData();
    // CHECK DATA
    try{
        validateExpense(expense)
    }catch(err){
        alert(err.message);
        return;
    }

    expense.baseAmount.value = parseFloat(expense.baseAmount.value);
    expense.amount = _exchangeCurrencyExpense(expense.baseAmount, _retrieveBudget())

    const expenses = _editExpense(id, expense);

    htmlUtils.renderExpenses(expenses);
    hideModal('edit-expense-modal');
    updateStatistics();
}

const updateExchangeCurrency = () => {
    const budget = _retrieveBudget();
    let expenses = _retrieveExpenses();
    
    expenses = expenses.map(expense => {
        expense.amount = _exchangeCurrencyExpense(expense.baseAmount, budget)
        return expense
    });

    _updateExpensesData(expenses);
    htmlUtils.renderExpenses(expenses)
}