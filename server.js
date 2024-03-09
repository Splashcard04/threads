const express = require(`express`)
const mongoose = require(`mongoose`)
const app = express()
const shortUrl = require(`./models/shortUrl`)
require(`dotenv`).config()



app.set(`view engine`, `ejs`)
app.use(express.urlencoded({ extended: false }))

app.get(`/`, async (req, res) => {
    const shortUrls = await shortUrl.db.urls
    res.render(__dirname + `/views/index.ejs`)
})

app.post(`/shortUrls`, (req, res) => {
    shortUrl.create(`https://www.google.com`)
    res.redirect(`/`)
})


app.listen(process.env.port || 3000, (port) => {
    console.log(`Server is running on port ${port | 3000}`)
})