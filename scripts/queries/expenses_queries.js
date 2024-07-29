const expensesKey = 'expenses';

const _retrieveExpenses = () => {
    let expenses = localStorageUtil.retrieveDataFromLocalStorage(expensesKey);
    if(!!!expenses){
        expenses = [];
        localStorageUtil.saveDataToLocalStorage(expensesKey, expenses);
    };

    return expenses;
}

const _addExpense = (expense) => {
    const expenses = _retrieveExpenses();
    expenses.push(expense);
    localStorageUtil.saveDataToLocalStorage(expensesKey, expenses)
    return expenses;
}

const _deleteExpense = (id) => {
    const expenses = _retrieveExpenses();
    expenses.splice(id, 1);
    localStorageUtil.saveDataToLocalStorage(expensesKey, expenses);
    return expenses;
}

const _editExpense = (id, expense) => {
    const expenses = _retrieveExpenses();
    expenses[id] = expense
    localStorageUtil.saveDataToLocalStorage(expensesKey, expenses)
    return expenses;
}

const _updateExpensesData = (expenses) => {
    localStorageUtil.saveDataToLocalStorage(expensesKey, expenses);
}

