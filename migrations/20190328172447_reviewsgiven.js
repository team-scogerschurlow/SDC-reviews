
exports.up = function(knex, Promise) {
    return knex.schema.createTable('reviewsgiven', (table)=>{
        table.increments('id')
        table.integer('reviewer').references('id').inTable('users');
        table.integer('listing').references('id').inTable('listings');
        table.date('date');
        table.text('body');
        table.float('overall_rating');
        table.float('accuracy_rating');
        table.float('communication_rating');
        table.float('cleanliness_rating');
        table.float('location_rating');
        table.float('checkin_rating');
        table.float('value_rating');
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('reviewsgiven')
};
