const express = require('express')
const db = require('./db/config')
const auth_routes = require('./routes/auth_routes')
const njk = require('nunjucks')
const cookie_parser = require('cookie-parser')
const app = express()
const port = 3000

const njk_env = njk.configure('views', {
  autoescape: true,
  express: app
})

// Custom filter: Error list in register page
njk_env.addFilter('is_valid', obj => {
  return typeof obj != 'undefined'
})

// Loads root directory for serving static files
app.use(express.static(__dirname))

app.use(
  express.urlencoded({
    extended: false
  })
)

// Parses requst body as json
app.use(express.json())

// Set and read cookies
app.use(cookie_parser())

// Homepage GET
app.get('/', async (req, res, next) => {
  try {
    const fetch_users = await db.query('SELECT name FROM users')
    res.render('index.html', {
      all_user: fetch_users.rows
    })
  } catch (error) {
    console.log(error)
  }
})

app.use(auth_routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
