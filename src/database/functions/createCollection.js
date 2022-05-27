const database = require('../../main')

/* 
    Create collection in MongoDB database.
    @param name string - Collection name 
    @return boolean - Success
*/
exports("createCollection", (name) => {
    database.listCollections({ name: name }).next((err, collinfo) => {
        if (collinfo) {
            console.log("[NB] Error: The collection already exists.")

            return false
        } else {
            database.createCollection(name, (err, res) => {
                if (err) return console.log("[NB] Error: " + err)

                console.log("[NB] The collection " + name + " was created.")
                return true
            });
        }
    });
});