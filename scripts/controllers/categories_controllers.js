
const sincronizeCategoriesData = (categories) => {
    _updateCategoriesData(categories);
    htmlUtils.renderCategories(categories);
    htmlUtils.updateCategorySelectors(categories);
}

const retrieveCategories = (s, category, date, amount) => {
    const categories = _retrieveCategories();
    htmlUtils.renderCategories(categories);
    htmlUtils.updateCategorySelectors(categories)
}

const insertCategory = () => {
    const category = htmlUtils.retrieveNewCategory();
    const categories = _retrieveCategories();
    if(categories.includes(category)){
        alert("The category name is already in use")
        return
    }

    try{
        validateCategory(category);
    }catch(e) {
        alert(e.message);
        return;
    }

    categories.push(category);

    sincronizeCategoriesData(categories);

    hideModal("add-category-modal");
    htmlUtils.clearNewCategory();
}

const deleteCategory = (id) => {
    const categories = _retrieveCategories();
    if(isCategoryBeingUsed(categories[id])){
        alert("The category being deleted is used by one or more expenses")
    }else{
        categories.splice(id, 1);

        sincronizeCategoriesData(categories);
    }

}

const updateCategory = () => {
    const editedCategory = htmlUtils.retrieveEditCategoryData();
    const categories = _retrieveCategories();

    if(categories.includes(editedCategory.category)){
        alert("The updated category name is already in use")
        return
    }

    try{
        validateCategory(editedCategory.category);
    }catch(e) {
        alert(e.message);
        return;
    }

    const oldCategory = categories[editedCategory.id];
    categories[editedCategory.id] = editedCategory.category;

    updateCategoryExpenses(oldCategory, editedCategory.category);
    
    hideModal("edit-category-modal");
    sincronizeCategoriesData(categories);
}
