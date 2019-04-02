const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index');
let app = express();

app.use('/:id', express.static( __dirname + '/../client/dist'));
app.use(bodyParser());

app.get('/api/:id', (request, response) => {
    db.select('reviewsgiven.*','users.username','users.profilePic')
    .from('reviewsgiven').innerJoin('users', 'reviewsgiven.reviewer', 'users.id').where({listing: request.params.id})
      .then((reviews) => {
        response.status(200).json(reviews);
      })
      .catch((error) => {
        console.log(error);
        response.status(500).json({ error });
      });
  });

// app.get('/api/:query', (request, response) => {
//     db.select('reviewsgiven.*','users.username','users.profilePic')
//     .from('reviewsgiven').innerJoin('users', 'reviewsgiven.reviewer', 'users.id').where('body', 'like', `%${request.params.id}%`)
//       .then((reviews) => {
//         response.status(200).json(reviews);
//       })
//       .catch((error) => {
//         console.log(error);
//         response.status(500).json({ error });
//       });
// });


const port = 1550;

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})