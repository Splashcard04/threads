const express = require(`express`)
const app = express()
const db = require(`./db.js`)
const ids = require(`./functionality/ids.js`)
const addUrl = require(`./functionality/addURL.js`)
const path = require(`path`)

app.set(`view engine`, `ejs`)
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, `public`)))

app.get(`/`, (req, res) => {
    res.render(__dirname + '/html/index.ejs')
})

app.post(`/newurl`, (req, res) => {
    let url = req.body.url

    //security

    if(!url.startsWith(`http://`) && !url.startsWith(`https://`)) {
        res.render(__dirname + `/html/error.ejs`, { error: `URL Invalid, Please enter a URL that contains a .domain` })
        return
    }

    if(url.includes(` `)) {
        res.render(__dirname + `/html/error.ejs`, { error: `URL Invalid, Please enter a URL that contains a .domain` })
        return
    }

    if(!url.includes(`.`)) {
        res.render(__dirname + `/html/error.ejs`, { error: `URL Invalid, Please enter a URL that contains a .domain` })
        return
    }

    if(db.db.urls.find(x => x.url === url)) {
        res.render(__dirname + `/html/existing.ejs`, { id: db.db.urls.find(x => x.url === url).id })
        return
    }

    let id = ids.idGen()
    if(db.db.urls.find(x => x.id === id)){
        id = ids.idGen()
    }

    addUrl.addUrl(url, id)

    res.render(__dirname+`/html/newurl.ejs`, { id: id })
})

app.post(`/reload`, (req, res) => {
    res.redirect(`/`)
})


//create redirects for every url in database
db.db.urls.forEach(x => {
    app.get(`/${x.id}`, (req, res) => {
        console.log(`posted at ${x.id}`)
        res.redirect(x.url)
    })
})

app.listen(3000, (port = 3000) => {
    console.log(`Server is running on port ${port}`)
})