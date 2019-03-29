
exports.seed = function(knex, Promise) {
  console.log('cleaning database')
  // Deletes ALL existing entries
  return knex('reviewsgiven').del()
    .then(function () {
      return knex('users').del()
    }).then( ()=> {
      return knex('listings').del()
    });
};
