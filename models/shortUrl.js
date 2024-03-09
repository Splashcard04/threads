const shortId = require(`shortid`)
const fs = require(`fs`)

const db = JSON.parse(fs.readFileSync(`./db.json`))

function createShortUrl(url) {
    const id = shortId.generate()
    db[id] = url
    fs.writeFileSync(`./db.json`, JSON.stringify(db))
    return id
}

module.exports = {
    db: db,
    create: createShortUrl
}