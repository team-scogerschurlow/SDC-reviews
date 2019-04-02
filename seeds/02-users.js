var users = require('../database/sampleusers');


var autoIncrementChange = users.length+1;

exports.seed = function(knex, Promise) {
  console.log('Users seed')
  return knex('users').del()
    .then(function () {
      return knex('users').insert(users);
    }).then( ()=> {
      return knex.raw(`ALTER TABLE listings AUTO_INCREMENT = ${autoIncrementChange}`)
    });
};
