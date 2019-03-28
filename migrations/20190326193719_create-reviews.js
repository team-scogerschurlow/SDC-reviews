
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('listings', (table)=>{
        table.increments('id').primary;
        table.text('name');
    }),
    knex.schema.createTable('users', (table)=>{
        table.increments('id').primary;
        table.text('username');
        table.text('user-profile-pic-url');
    }),
    knex.schema.createTable('reviewsgiven', (table)=>{
      table.increments('id').primary();
      table.integer('userID').unsigned()
        .references('users.id');
      table.integer('listingID').unsigned()
        .references('listings.id');
      table.date('date');
      table.text('body');
      table.float('overall_rating');
      table.float('accuracy_rating');
      table.float('communication_rating');
      table.float('cleanliness_rating');
      table.float('location_rating');
      table.float('checkin_rating');
      table.float('value_rating');
    })
  ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('listings'),
        knex.schema.dropTable('users'),
        knex.schema.dropTable('reviewsgiven')
    ]);
};