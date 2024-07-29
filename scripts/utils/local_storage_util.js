


/**
 * Ckl
 */
const LocalStorageUtil = class {

    retrieveDataFromLocalStorage = (key) => { 
        try {
            const data = localStorage.getItem(key)
            return JSON.parse(data)
        }catch(error){
            console.error(`Couldn't retrieve data from local storage associated with the key ${key}.`)
        }
    }

    /**
     * 
     * @param {*} key 
     * @param {*} data 
     */
    saveDataToLocalStorage = (key, data) => {
        try {
            const stringyfiedData = JSON.stringify(data)
            localStorage.setItem(key, stringyfiedData)
        }catch(error){
            console.error(`Couldn't save data to local storage associated with the key ${key}.`)
        }
    }

    retrieveAllKeys = () => {
        return {...localStorage}
    }

    saveaAllKeys = () => {
        
    }
}

const localStorageUtil = new LocalStorageUtil();
