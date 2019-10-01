const express = require('express');
const router = express.Router();
const restricted = require('../data/workers/auth/restricted');

const Users = require('../data/models/user');

router.get("/", restricted, (req, res) => {
    Users.find()
      .then(users => {
        if (users) {
          return res.status(200).json(users);
        } else {
          return res.status(404).json({ error: "Unable to find users." });
        }
      })
      .catch(err => res.status(500).send(err));
});

router.get("/:id", restricted, (req, res) => {
    Users.findById(req.params.id)
      .then(user => {
        if (user) {
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ error: "User does not exist." });
        }
      })
      .catch(err => res.send(err));
});

router.put("/:id", restricted, (req, res) => {
    let user = req.body;
    let id = req.params.id;
    Users.findByIdAndUpdate(user, id)
      .then(updated => {
        if (updated) {
          return res.status(200).json({ message: "User has been updated." });
        } else {
          return res
            .status(404)
            .json({ message: "Unable to update user. Please fill out all fields." });
        }
      })
      .catch(error => res.status(500).json(error));
});

router.delete("/:id", restricted, (req, res) => {
    Users.remove(req.params.id)
      .then(deleted => {
        if (deleted) {
          return res.status(200).json({ message: "User has been deleted." });
        } else {
          return res
            .status(404)
            .json({ message: "Unable to delete user. User not found." });
        }
      })
      .catch(error => res.status(500).json(error));
});

module.exports = router;