var users = require('../database/sampleusers');

exports.seed = function(knex, Promise) {
  console.log('Users seed')
  return knex('users').del()
    .then(function () {
      return knex('users').insert(users);
    });
};
