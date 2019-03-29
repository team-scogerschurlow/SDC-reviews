const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser());




const port = 1550;

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})