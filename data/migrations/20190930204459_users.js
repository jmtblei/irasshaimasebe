
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable("users", user => {
        user.increments();
        user
            .string("username", 32)
            .notNullable()
            .unique();
        user
            .string("passwod", 128)
            .notNullable();
        user
            .string("email", 128);
        user
            .string("firstname");
        user
            .string("lastname");
    })
};

exports.down = function(knex, Promise) {
    return knex.schema
    .dropTableIfExists("users");
};
