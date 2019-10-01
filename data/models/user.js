const db = require("../config/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  findByIdAndUpdate,
  findReservationsByUserId
};

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

async function findById(id) {
  const users = await db("users")
    .where({ id })
    .first();

  const reservations = await db("reservations").where({ user_id: id });

  users["reservations"] = reservations;

  return users;
}

async function findReservationsByUserId(id) {
  const reservations = await db("reservations").where({ user_id: id });
  console.log(reservations);
  return reservations;
}

function remove(id) {
  return db("users")
    .where({ id })
    .first()
    .del();
}

function findByIdAndUpdate(user, id) {
  return db("users")
    .where({ id })
    .update(user);
}
