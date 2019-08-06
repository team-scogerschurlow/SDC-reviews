const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3333
const db = require('./queries')

app.use('/:id', express.static( __dirname + '/../client/dist'))
app.use(bodyParser.json())

app.get('/listings/:id', db.getReviewsById)

app.listen(port, ()=> {
  console.log(`listening on port ${port}`)
})