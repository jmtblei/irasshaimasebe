
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable("reservations", reservation =>{ 
        reservation.increments();
        reservation
            .string("firstname", 32)
            .notNullable();
        reservation
            .string("lastname", 32)
            .notNullable();
        reservation
            .string("phonenumber")
            .notNullable();
        reservation
            .integer("partysize")
            .notNullable();
        reservation.integer("user_id")
            .unsigned()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists("reservation")
};
