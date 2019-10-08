const express = require('express');
const router = express.Router();
const restricted = require('../data/workers/auth/restricted');

const Reserve = require('../data/models/reservations');


//add a reservation
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

//get all reservations of all users
router.get("/", restricted, (req, res) => {
    Reserve.find()
        .then(reservation => {
            if (reservation) {
                return res.status(200).json(reservation);
            } else {
                return res.status(404).json({ error: "Reservations not found" });
            }
        })
        .catch(err => res.status(500).json(err));
});

//get reservation by id
router.get("/:id", restricted, (req, res) => {
    Reserve.findById(req.params.id)
        .then(reservation => {
            if (reservation) {
                return res.status(200).json(reservation);
            } else {
                return res.status(404).json({ message: "Reservation doesn't exist!" })
            }
        })
        .catch(err => res.status(500).json(err));
});

//edit specific reservation entry
router.put("/:id", restricted, (req, res) => {
    let reservation = req.body;
    let id = req.params.id;
    Reserve.findByIdAndUpdate(reservation, id)
        .then(updated => {
            if (updated) {
                return res.status(200).json({ message: "Reservation has been updated." });
            } else {
                return res.status(404).json({ message: "Please provide all fields to update." });
            }
        })
        .catch(err => res.status(500).json(err));
});

//delete reservation entry
router.delete("/:id", restricted, (req, res) => {
    Reserve.remove(req.params.id)
        .then(deleted => {
            if (deleted) {
                return res.status(200).json({ message: "Reservation has been deleted." });
            } else {
                return res.status(404).json({ message: "Unable to delete reservation." });
            }
        })
        .catch(err => res.status(500).json(err))
});

module.exports = router;
