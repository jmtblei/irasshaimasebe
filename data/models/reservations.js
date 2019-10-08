const db = require("../config/dbConfig");

module.exports = {
    add,
    find,
    findBy,
    findById
};

function find() {
    return db("reservations");
}

function findBy(filter) {
    return db("reservations")
        .where(filter);
}

async function add(event) {
    const [id] = await db("reservations").insert(event);
    return findById(id);
}

function findById(id) {
    return db("reservations")
        .where({ id })
        .first();
}