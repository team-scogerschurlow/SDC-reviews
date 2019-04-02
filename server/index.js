const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/index');
let app = express();

app.use('/:id', express.static( __dirname + '/../client/dist'));
app.use(bodyParser());


//Get Request for all reviews of that listing
app.get('/listings/:id', (request, response) => {
    db.count('*').from('reviewsgiven').where({listing: request.params.id}).then( (reviewCount)=> {
        db.select('reviewsgiven.*','users.username','users.profilePic')
            .from('reviewsgiven').innerJoin('users', 'reviewsgiven.reviewer', 'users.id').where({listing: request.params.id})
            .limit(10)
            .then((reviews) => {
            response.status(200).json({reviews, reviewCount: reviewCount[0]["count(*)"]});
            })
            .catch((error) => {
            console.log(error);
            response.status(500).json({ error });
            });
    });  
});

//Get Request for the next page of reviews of a particular listing
app.get('/listings/:id/page', (request, response) => {
    var numToOffset = (request.query.offset-1)*10;
    if(request.query.search === undefined){
        db.select('reviewsgiven.*','users.username','users.profilePic')
            .from('reviewsgiven').innerJoin('users', 'reviewsgiven.reviewer', 'users.id').where({listing: request.params.id})
            .limit(10)
            .offset(numToOffset)
            .then((reviews) => {
                response.status(200).json({reviews});
            })
            .catch((error) => {
            console.log(error);
            response.status(500).json({ error });
            });
    } else if(request.query.search){
        db.select('reviewsgiven.*','users.username','users.profilePic')
            .from('reviewsgiven').innerJoin('users', 'reviewsgiven.reviewer', 'users.id').where({listing: request.params.id}).where('body', 'like', `%${request.query.search}%`)
            .limit(10)
            .offset(numToOffset)
            .then((reviews) => {
                response.status(200).json({reviews});
            })
            .catch((error) => {
            console.log(error);
            response.status(500).json({ error });
            });
    }
});

app.get('/listings/:id/reviews', (request, response) => {
    console.log(request.params);
    console.log(request.query);
    db.count('*').from('reviewsgiven').where({listing: request.params.id}).where('body', 'like', `%${request.query.search}%`).then( (reviewCount)=> {
        db.select('reviewsgiven.*','users.username','users.profilePic')
        .from('reviewsgiven').innerJoin('users', 'reviewsgiven.reviewer', 'users.id').where({listing: request.params.id}).where('body', 'like', `%${request.query.search}%`)
        .limit(10)
        .then((reviews) => {
            response.status(200).json({reviews, searchCount: reviewCount[0]["count(*)"]});
        })
        .catch((error) => {
            console.log(error);
            response.status(500).json({ error });
        });
    });
});


const port = 1550;

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})