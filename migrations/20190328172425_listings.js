
exports.up = function(knex, Promise) {
    return knex.schema.createTable('listings', (table)=> {
        table.increments('id').primary;
        table.text('title');
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('listings')
}