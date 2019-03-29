const reviews = require('../database/sampledata');

exports.seed = function(knex, Promise) {
  console.log('Reviewer seed')
  
  return knex('reviewsgiven').del()
    .then(function () {
      return knex('reviewsgiven').insert(reviews[1]);
    })
};