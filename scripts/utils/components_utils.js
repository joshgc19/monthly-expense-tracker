
const eachCategoryComponent = (id, category) => {
    return `
        ${category} 
        <span class="button-cluster">
            <span class="icon-button" onClick="showEditCategoryModal(${id}, \'${category}\')">
                <img class="icon-small" src="./images/edit.svg"/>
            </span>
            <span class="icon-button" onClick="deleteCategory(${id})">
                <img class="icon-small" src="./images/delete.svg"/>
            </span>
        </span>
    `
}

const eachExpenseComponent = (id, expense) => {
    expense.amount.value = -expense.amount.value;

    return `
        <div class="col-4 col-s-4">
            <div><strong>${expense.name}</strong></div>
            <div class="expense-category">${expense.category}</div>
        </div>
        <div class="col-3 col-s-3">${formatDate(expense.date)}</div>
        <div class="col-3 col-s-3 outcome">${formatAmount(expense.amount)}</div>
        <div class="col-3 col-s-3">
            <div class="button-cluster">
                <span class="icon-button">
                    <img class="icon-small" src="./images/edit.svg" onclick="showEditExpenseModal(${id})"/>
                </span>
                <span class="icon-button">
                    <img class="icon-small" src="./images/delete.svg" onClick="deleteExpense(${id})"/>
                </span>
            </div>
        </div>
    `
}

const noDataComponent = (title, subtitle) => {
    return `
        <div class="no-registers-layout">
            <strong>${title}</strong>
            <p class="subtitle">${subtitle}</p>
        </div>
    `
}

const expenseSummaryHeaderComponent = () => {
    return `
        <th>Category</th>
        <th>Amount spent</th>
        <th>Spense count</th>
    `
} 

const expenseSummaryRowComponent = ({name, amount, count}) => {
    console.log(amount);
    return `
        <td>${name}</td>
        <td>${formatAmount(amount)}</td>
        <td>${count}</td>
    `;
}