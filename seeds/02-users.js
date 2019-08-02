var users = require('../database/sampleusers');

var autoIncrementChange = users.length+1;

exports.seed = function(knex, Promise) {
  console.log('Users seed')
  return knex('users').del()
    .then(function () {
      return knex('users').insert(users);
    }).then( ()=> {
      return knex.raw(`SELECT setval('users_id_seq ', (SELECT MAX(id) FROM users));`)
      // return knex.raw(`ALTER TABLE listings AUTO_INCREMENT = ${autoIncrementChange}`)
    });
};
