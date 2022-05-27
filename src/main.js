const mongodb = require('mongodb')
const config = require('./config/config.json')

const url = config.database.url
const name = config.database.name
let database

// database connection
mongodb.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => {
    console.log(`[NB] The connection of ${name} is succesfull.`)

    database = db.db(name)

}).catch(err => console.log("[NB] Error: " + err))







