

const showModal = (id) => {
    htmlUtils.retrieveNodeById(id).style.display = "block";
}

const showEditCategoryModal = (id, category) => {
    htmlUtils.setUpEditCategoryModal(id, category);
}

const showEditExpenseModal = (id) => {
    const expense = retrieveExpenseById(id)
    htmlUtils.setupEditExpenseModal(id, expense);
}

const hideModal = (id) => {
    htmlUtils.retrieveNodeById(id).style.display = "none";
}

const initializeApplication = () => {
    retrieveBudget();
    retrieveCategories();
    retrieveExpenses();
    updateStatistics();
}

retrieveCurrencies();
initializeApplication();
