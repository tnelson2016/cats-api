require('dotenv').config()
const express = require('express')
const app = express()
const HTTPError = require('node-http-error')
const bodyParser = require('body-parser')
const port = process.env.PORT || 5000
const { getDoc } = require('./dal')

const {
  not,
  isEmpty,
  propOr,
  append,
  pathOr,
  compose,
  head,
  last,
  split,
  filter,
  find,
  toLower,
  reject
} = require('ramda')

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('meow!'))

app.get('/cats/:id', (req, res, next) => {
  getDoc(req.params.id, function(err, data) {
    if (err) {
      next(new HTTPError(err.status, err.message, err))
      return
    }
    res.send(data)
    return
  })
})

app.listen(port, () => console.log('CATS! ', port))
