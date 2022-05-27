import { checkParams } from '../main';

/* 
    Insert a single document into MongoDB.
    @param params.collection String - Collection name 
    @param params.document object - Document to insert
    @param params.options object - Optional object settings
    @param callback(success<boolean>, insertedCount<number>, insertedIds<Array>) - callback (optional)
*/
exports("insertOne", (params, callback) => {
    if (checkParams(params)) {
        params.documents = [params.document];
        params.document = null;
    }

    return insert(params, callback)
});
