
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table)=>{
        table.increments('id').primary;
        table.text('username');
        table.text('profilePic');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
