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

async function add(reservation) {
    const [id] = await db("reservations").insert(reservation);
    return findById(id);
}

function findById(id) {
    return db("reservations")
        .where({ id })
        .first();
}