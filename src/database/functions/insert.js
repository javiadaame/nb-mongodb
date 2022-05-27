import { database } from '../../main';
import { checkDatabaseReady, checkParams, getParamsCollection } from '../main';

/* 
    Insert array of documents into MongoDB collection.
    @param params.collection String - Collection name 
    @param params.documents object - Array of documents to insert
    @param params.options object - Optional object settings
    @param callback(success<boolean>, insertedCount<number>, insertedIds<Array>) - callback (optional) Inserts an array of documents into MongoDB
*/
exports("insert", function insert(params, callback) {
    if (!checkDatabaseReady()) return;
    if (!checkParams(params)) return console.log(`[NB] Error (exports.insert): Invalid params object.`);

    let collection = getParamsCollection(params);
    if (!collection) return console.log(`[NB] Error (exports.insert): Invalid collection "${params.collection}"`);

    let documents = params.documents;
    if (!documents || !Array.isArray(documents))
        return console.log(`[NB] Error (exports.insert): Expected object or array of objects.`);

    const options = utils.safeObjectArgument(params.options);

    collection.insertMany(documents, options, (err, result) => {
        if (err) {
            console.log(`[NB] Error (exports.insert): "${err.message}".`);
            utils.safeCallback(callback, false, err.message);
            return;
        }
        let arrayOfIds = [];

        for (let key in result.insertedIds) {
            if (result.insertedIds.hasOwnProperty(key)) {
                arrayOfIds[parseInt(key)] = result.insertedIds[key].toString();
            }
        }
        utils.safeCallback(callback, true, result.insertedCount, arrayOfIds);
    });
    process._tickCallback();
});