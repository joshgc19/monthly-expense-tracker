
const validateCategory = (category) => {
    if(category.length === 0){
        throw new Error("You must fill the category name")
    }
};

const validateExpense = (expense) => {
    if(expense.name.length === 0){
        throw new Error("You must fill the expense name");
    }
    if(expense.category === ""){
        throw new Error("You must select a category for the expense");
    }
    if(expense.date === ""){
        throw new Error("You must fill the expense date");
    }
    if(expense.baseAmount.value === ""){
        throw new Error("You must fill the expense amount");
    }
    if(isNaN(expense.baseAmount.value)){
        throw new Error("The expense amount is invalid")
    }
}

