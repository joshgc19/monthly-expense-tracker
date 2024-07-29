

const downloadObjectAsJson = (exportObj, exportName) =>{
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

const importData = async () => {
    const readFile =  new Promise((resolve, reject) => {
        const file = htmlUtils.retrieveImportFiles();
        let read = new FileReader();
        read.readAsText(file);
        read.onloadend = () => {
            resolve(JSON.parse(read.result))
        }
    })

    const data = await readFile;

    Object.keys(data).forEach(element => {
        localStorageUtil.saveDataToLocalStorage(element, JSON.parse(data[element]));
    });

    initializeApplication();

}

const exportData = () => {
    const data = localStorageUtil.retrieveAllKeys();
    downloadObjectAsJson(data, "export_budget_" + (new Date()).toISOString());
}