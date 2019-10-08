const db = require("../config/dbConfig");

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove,
    findByIdAndUpdate
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

function remove(id) {
    return db("reservations")
        .where({ id })
        .first()
        .del();
}

function findByIdAndUpdate(reservation, id) {
    return db("reservations")
        .where({ id })
        .update(reservation);
}