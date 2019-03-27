
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews-left', (table)=>{
      table.increments();
      table.integer('userID');
      table.date('date');
      table.text('body');
      table.float('overall_rating');
      table.float('accuracy_rating');
      table.float('communication_rating');
      table.float('cleanliness_rating');
      table.float('location_rating');
      table.float('check-in_rating');
      table.float('value_rating');
  })
};

exports.down = function(knex, Promise) {
    
  return knex.schema.dropTable('reviews_left');
};
