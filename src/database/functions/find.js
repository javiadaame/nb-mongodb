import { checkDatabaseReady, checkParams, getParamsCollection } from '../main';

/* 
    Database find query.
    @param params.collection string - Collection name
    @param params.query object - Filter query object
    @param params.options object - Optional object settings
    @param params.limit number - Limit document count
    @param callback(success<boolean>, documents<Array>) - callback (optional) 
*/
exports("find", function find(params, callback) {
    if (!checkDatabaseReady()) return;
    if (!checkParams(params)) return console.log(`[Adame] [ERROR] exports.find: Invalid params object.`);

    let collection = getParamsCollection(params);
    if (!collection) return console.log(`[Adame] [ERROR] exports.insert: Invalid collection "${params.collection}"`);

    const query = utils.safeObjectArgument(params.query);
    const options = utils.safeObjectArgument(params.options);

    let cursor = collection.find(query, options);
    if (params.limit) cursor = cursor.limit(params.limit);
    cursor.toArray((err, documents) => {
        if (err) {
            console.log(`[Adame] [ERROR] exports.find: Error "${err.message}".`);
            utils.safeCallback(callback, false, err.message);
            return;
        };
        utils.safeCallback(callback, true, utils.exportDocuments(documents));
    });
    process._tickCallback();
})