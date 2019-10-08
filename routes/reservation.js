const express = require('express');
const router = express.Router();
const restricted = require('../data/workers/auth/restricted');

const Reserve = require('../data/models/reservations');

router.post("/", restricted, (req, res) => {
    let reservation = req.body;
    const { firstname, lastname, phonenumber, partysize } = req.body;
    if (!firstname || !lastname || !phonenumber || !partysize) {
        return res.status(400).json({ message: "You must provide all fields." });
    }
    Reserve.add(reservation)
        .then(reservation => {
            return res.status(201).json(reservation);
        })
        .catch(err => res.status(500).json(err));
});

router.get("/", restricted, (req, res) => {
    Reserve.find()
        .then(reservation => {
            if (reservation) {
                return res.status(200).json(reservation);
            } else {
                return res.status(404).json({ error: "Reservation not found" });
            }
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;
