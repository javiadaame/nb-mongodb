const database = require('../../main')

/* 
    Create collection in MongoDB database.
    @param name string - Collection name 
*/
function create(name) {
    database.listCollections({ name: collection_name }).next((err, collinfo) => {
        if (collinfo) {
            console.log("[NB] Error: The collection already exists.")
        } else {
            database.createCollection(collection_name, (err, res) => {
                if (err) return console.log("[NB] Error: " + err)

                console.log("[NB] The collection " + collection_name + " was created.")
            });
        }
    });
}