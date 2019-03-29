const websiteText = require('../database/samplewords');


var listings = websiteText.listings
var autoIncrementChange = listings.length

exports.seed = function(knex, Promise) {
  console.log('Listings seed')
  // Deletes ALL existing entries
  return knex('listings').del()
    .then(function () {
      return knex('listings').insert(listings);
    }).then( ()=> {
      return knex.raw('ALTER TABLE listings AUTO_INCREMENT = 100')
    });
};
