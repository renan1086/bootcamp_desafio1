const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('View', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'njk')

const checkAge = (req, res, next) => {
  let age = req.body.age

  if (!age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.post('/check', checkAge, (req, res) => {
  let age = req.body.age

  if (age >= 18) {
    return res.redirect(`major?age=${age}`)
  } else {
    return res.redirect(`minor?age=${age}`)
  }
})

app.get('/major', (req, res) => {
  let age = req.query.age

  return res.render('major', { age: age })
})

app.get('/minor', (req, res) => {
  let age = req.query.age

  return res.render('minor', { age: age })
})

app.listen(3000)
