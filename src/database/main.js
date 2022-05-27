const database = require('../main.js')

function checkConnection() {
    if (!database) {
        console.log("[NB] Error: The database is not connected.")
        return false;
    }

    return true;
}

function checkParams(params) {
    return params !== null && typeof params === 'object'
}

function getParamsCollection(params) {
    if (!params.collection) return
    return database.collection(params.collection)
}  