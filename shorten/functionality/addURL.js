const db = require('../db.js')
const fs = require('fs')

module.exports.addUrl = function addURL(url, id) {
    db.db.urls.push({ url: url, id: id })
    fs.writeFileSync('./db.json', JSON.stringify(db.db, null, 4))
}