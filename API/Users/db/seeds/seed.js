const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  await knex('users').del();
  await knex('users').insert([
    {
      username: 'admin',
      email: 'a@a',
      password: await bcrypt.hash('admin', 10),
      role: 'admin'
    },
    {
      username: 'test_user',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user'
    }
  ]);
};