
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('runs',function(table) {
      table.increments('id').primary();
      table.float('length');
      table.float('time');
      table.text('personal_notes');
      table.date('run_on');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('runs'),
  ]);
};
