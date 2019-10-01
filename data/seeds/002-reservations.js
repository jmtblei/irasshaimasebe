
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('reservations').del()
    .then(function () {
      // Inserts seed entries
      return knex('reservations').insert([
        {id: 1, firstname: 'diner1', lastname: 'dasher1', phonenumber: '1111111111', partysize: '2', user_id: 1},
        {id: 2, firstname: 'diner2', lastname: 'dasher2', phonenumber: '2222222222', partysize: '4', user_id: 2},
        {id: 3, firstname: 'diner3', lastname: 'dasher3', phonenumber: '3333333333', partysize: '5', user_id: 3}
      ]);
    });
};
