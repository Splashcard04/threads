const fs = require(`fs`)

const db = JSON.parse(fs.readFileSync(`./db.json`))

module.exports = { db: db }