const reviews = require('../database/sampledata');

var autoIncrementChange = reviews.length+1;
console.log(reviews[0]);
console.log(reviews[1]);

exports.seed = function(knex, Promise) {
  console.log('Reviewer seed')
  
  return knex('reviewsgiven').del()
    .then(function () {
      return knex('reviewsgiven').insert(reviews);
    }).then( () => {
      return knex.raw(`ALTER TABLE listings AUTO_INCREMENT = ${autoIncrementChange}`)
    });
};