const bcrypt = require('bcryptjs');

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Restaurant1', password: bcrypt.hashSync('password', 10),
      email: 'restaurant1@email.com', firstname: 'Owner1', lastname:  'business1'},
        {username: 'Restaurant2', password: bcrypt.hashSync('password', 10),
      email: 'restaurant2@email.com', firstname: 'Owner2', lastname:  'business2'},
        {username: 'Restaurant3', password: bcrypt.hashSync('password', 10),
      email: 'restaurant3@email.com', firstname: 'Owner3', lastname:  'business3'}
      ]);
    });
};
