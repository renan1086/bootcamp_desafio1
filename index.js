const express = require('express')

const app = express()

app.get('/', (req, res) => {
  return res.send('Ola 2')
})

app.listen(3000)
