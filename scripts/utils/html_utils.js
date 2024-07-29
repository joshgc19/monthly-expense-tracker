
// Budget nodes
const budgetCurrency = document.getElementById('budget-currency-select');
const budgetAmount = document.getElementById('budget-amount');
const budgetAmountSpentNode = document.getElementById('amount-spent');
const budgetLeftNode = document.getElementById('budget-left-amount');
const mostSpentCategoryNode = document.getElementById('category-most-spent-on');
const expensesSummaryTableNode = document.getElementById('expenses-summary-table');

// Categories nodes
const categoriesListNode = document.getElementById("categories-list");
const newCategoryNode = document.getElementById("add-category-name");
const editCategoryIdNode = document.getElementById("edit-category-id")
const editCategoryNameNode = document.getElementById("edit-category-name");
const editCategoryModal = document.getElementById("edit-category-modal");

// Expenses list nodes
const expensesListNode = document.getElementById("expenses-list")
const filterSearchBarNode = document.getElementById("expense-name-filter");
const filterDateNode = document.getElementById("expense-date-filter");
const filterCategoriesSelectorNode = document.getElementById('expense-category-filter');

// Add expense nodes
const addExpenseNameNode = document.getElementById('add-expense-name');
const addExpenseCategoriesSelectorNode = document.getElementById('add-expense-category');
const addExpenseDateNode = document.getElementById('add-expense-date');
const addExpenseAmountNode = document.getElementById('add-expense-amount');
const addExpenseCurrencyNode = document.getElementById('add-expense-currency')

// Edit expense nodes
const editExpenseNameNode = document.getElementById("edit-expense-name");
const editExpenseCategoryNode = document.getElementById("edit-expense-category");
const editExpenseDateNode = document.getElementById("edit-expense-date");
const editExpenseAmountNode = document.getElementById("edit-expense-amount");
const editExpenseCurrencyNode = document.getElementById("edit-expense-currency");
const editExpenseIdHolderNode = document.getElementById("edit-expense-id");

//Currencies nodes
const selectCurrencyNodes = document.getElementsByClassName('currency-select');

// Dynamic icons
const brokenPiggyBank = "./images/no-money.svg";
const greenPiggyBank = "./images/savings.svg";
const budgetLeftIconContainer = document.getElementById("budget-left-icon");
const budgetLeftIconImage = document.getElementById("budget-left-img")

// Dyncamic classses
const budgetLeftClasses = "currency-symbol favor"
const noBudgetLeftClasses = "currency-symbol debt"

// Import nodes
const importButtonNode = document.getElementById("import-btn")


class HTMLUtils {
    newNode = (nodeInnerStr, nodeElement="div", nodeClasses  =[]) => {
        let node = document.createElement(nodeElement);
        node.innerHTML = nodeInnerStr;
        node.classList = nodeClasses;
        return node;
    }

    renderCategories = (categories) => {
        categoriesListNode.innerHTML = '';

        if(categories.length === 0){
            categoriesListNode.appendChild(this.newNode(noDataComponent(
                'There is no categories registered',
                'Add some categories to be able to add new expenses'
            )))
        }else{
            categories.forEach((category, index) => {
                if(index !== 0){
                    categoriesListNode.appendChild(this.newNode("", "hr"));
                }
                categoriesListNode.appendChild(this.newNode(eachCategoryComponent(index, category), "li"));
            });
        }
        
    }

    retrieveNewCategory = () => {
        return newCategoryNode.value;
    }

    retrieveEditCategoryData = () => {
        return {
            id: editCategoryIdNode.innerHTML,
            category: editCategoryNameNode.value
        }
    }

    clearNewCategory = () => {
        newCategoryNode.value = "";
    }

    retrieveNodeById = (id) => {
        return document.getElementById(id);
    }

    setUpEditCategoryModal = (id, category) => {
        editCategoryNameNode.value = category
        editCategoryIdNode.innerHTML = id;
        editCategoryModal.style.display = "block"
    }

    updateCategorySelectors = (categories) => {
        filterCategoriesSelectorNode.innerHTML = '';
        addExpenseCategoriesSelectorNode.innerHTML = '';

        categories.forEach((category, index) => {
            filterCategoriesSelectorNode.appendChild(new Option(category, index));
            addExpenseCategoriesSelectorNode.appendChild(new Option(category, index));
            editExpenseCategoryNode.appendChild(new Option(category, index));
        });

        filterCategoriesSelectorNode.selectedIndex = -1;
        addExpenseCategoriesSelectorNode.selectedIndex = -1;
        editExpenseCategoryNode.selectedIndex = -1;
    }

    renderExpenses = (expenses) => {
        const filters = this.retrieveExpensesFilters();

        expensesListNode.innerHTML = '';
        if(expenses.length !== 0){
            
            let expensesRendered = 0;
            expenses.forEach((expense, index) => { 
                const searchBarFilter = !!!filters.s || expense.name.toLowerCase().startsWith(filters.s.toLowerCase());
                const dateFilter = !!!filters.date || expense.date === filters.date;
                const categoriesFilter = !!!filters.category || expense.category === filters.category
                
                if (searchBarFilter && dateFilter && categoriesFilter){
                    expensesListNode.appendChild(this.newNode(eachExpenseComponent(index, expense), "li")); 
                    expensesRendered += 1;
                }
            });
            if(expensesRendered > 0){
                return
            }
        }
        expensesListNode.appendChild(this.newNode(noDataComponent(
            'There is no expenses registered',
            'Add some expenses to start calcuting your budget'
        )))
    }

    retrieveExpensesFilters = () => {
        return {
            s: filterSearchBarNode.value === ''? null : filterSearchBarNode.value,
            date: filterDateNode.value,
            category: filterCategoriesSelectorNode.selectedIndex === -1? null : filterCategoriesSelectorNode.options[filterCategoriesSelectorNode.selectedIndex].text,
        }
    }

    retrieveNewExpenseData = () => {
        return {
            name: addExpenseNameNode.value,
            category: addExpenseCategoriesSelectorNode.selectedIndex !== -1 ? addExpenseCategoriesSelectorNode.options[addExpenseCategoriesSelectorNode.selectedIndex].text : "",
            date: addExpenseDateNode.value,
            baseAmount: {
                currency: _getCurrencyBySymbol(addExpenseCurrencyNode.options[addExpenseCurrencyNode.selectedIndex].text),
                value: addExpenseAmountNode.value
            }
        }
    }

    clearNewExpense = () => {
        addExpenseNameNode.value = "";
        addExpenseCategoriesSelectorNode.selectedIndex = -1;
        addExpenseDateNode.value = null;
        addExpenseAmountNode.value = null;
    }

    setupEditExpenseModal = (id, expense) => {
        editExpenseNameNode.value = expense.name;
        editExpenseDateNode.value = expense.date;
        editExpenseAmountNode.value = expense.baseAmount.value;
        editExpenseIdHolderNode.innerHTML = id
        editExpenseCategoryNode.selectedIndex = _getCategoryIdByName(expense.category);
        editExpenseCurrencyNode.selectedIndex = _getCurrencyIdBySymbol(expense.baseAmount.currency.symbol);
        showModal("edit-expense-modal");
        
    }

    renderBudget = (currencyId, budget) => {
        console.log(budget)
        if(budget.amount !== null && budget.amount !== undefined){
            budgetAmount.value = formatBudget(budget)
        }else{
            budgetAmount.value = "";
        }
        budgetCurrency.selectedIndex = currencyId;
    }

    retrieveBudget = () => { 
        return {
            currency: budgetCurrency.options[budgetCurrency.selectedIndex].text,
            amount: budgetAmount.value
        }
    }

    renderStatistics = (statistics, budgetLeft, amountSpent, category) => {
        if(budgetLeft.value < 0){
            budgetLeftIconContainer.className = noBudgetLeftClasses;
            budgetLeftIconImage.src = brokenPiggyBank;
        }else{
            budgetLeftIconContainer.className = budgetLeftClasses;
            budgetLeftIconImage.src = greenPiggyBank;
        }

        budgetLeftNode.innerHTML = formatAmount(budgetLeft);
        budgetAmountSpentNode.innerHTML = formatAmount(amountSpent);
        mostSpentCategoryNode.innerHTML = category.name;

        expensesSummaryTableNode.innerHTML = "";
        if(statistics.categories.length === 0){
            expensesSummaryTableNode.appendChild(this.newNode(noDataComponent(
                'There is no expenses registered',
                'Add some expenses to visualize the summary'
            )))
        }else{
            expensesSummaryTableNode.appendChild(this.newNode(expenseSummaryHeaderComponent(), "tr"))
            statistics.categories.sort((categoryA, categoryB) => {
                if(categoryA.amount.value > categoryB.amount.value) return -1;
                if(categoryB.amount.value < categoryB.amount.value) return 1;
                return 0;
            })
            statistics.categories.forEach(category => {
                expensesSummaryTableNode.appendChild(this.newNode(expenseSummaryRowComponent(category), "tr"))
            });
        }
    }

    renderCurrencies = (currencies) => {
        currencies.forEach(currency => {
            for (let node of selectCurrencyNodes ){
                node.appendChild(new Option(currency.symbol, currency.code))
            }
        })
    }

    retrieveEditExpenseData = () => {
        return {
            expense: {
                name: editExpenseNameNode.value,
                category: editExpenseCategoryNode.options[editExpenseCategoryNode.selectedIndex].text,
                date: editExpenseDateNode.value,
                baseAmount: {
                    currency: _getCurrencyBySymbol(editExpenseCurrencyNode.options[editExpenseCurrencyNode.selectedIndex].text),
                    value: editExpenseAmountNode.value
                }
            },
            id: editExpenseIdHolderNode.innerHTML
        }
    }

    retrieveImportFiles = () => {
        const file = importButtonNode.files.item(0);
        importButtonNode.type = "text";
        importButtonNode.type = "file"
        return file;
    }
}

const htmlUtils = new HTMLUtils();
