const categoriesKey = 'categories';

const _retrieveCategories = () => {
    let categories = localStorageUtil.retrieveDataFromLocalStorage(categoriesKey);
    if(!!!categories){
        categories = ["Pet Care", "Medicine"];
        localStorageUtil.saveDataToLocalStorage(categoriesKey, categories);
    };
    return categories;
}

const _insertCategory = (category) => {
    let categories = localStorageUtil.retrieveDataFromLocalStorage(categoriesKey);
    categories.push(category);
    localStorageUtil.saveDataToLocalStorage(categoriesKey, categories);
    return categories;
}

const _deleteCategory = (category) => {
    let categories = localStorageUtil.retrieveDataFromLocalStorage(categoriesKey);
    categories.filter((item) => item === category);
    localStorageUtil.saveDataToLocalStorage(categoriesKey, categories);
    return categories;
}

const _updateCategory = (categoryId) => {

}

const _updateCategoriesData = (categories) => {
    localStorageUtil.saveDataToLocalStorage(categoriesKey, categories);
}

const _getCategoryIdByName = (category) => {
    const categories = _retrieveCategories();
    return categories.findIndex(eachCategory => category === eachCategory);
}
