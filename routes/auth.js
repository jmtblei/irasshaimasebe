const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router()
const createToken = require('../data/workers/auth/token');

const Users = require('../data/models/user');

//register a user
router.post("/register", (req, res) => {
    let user = req.body;
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "You must provide a username and a password." });
    }
    Users.add(user)
      .then(saved => {
        return res.status(201).json(saved);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
});

//login as user
router.post("/login", (req, res) => {
    let { username, password } = req.body;
  
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "You must provide a username and a password." });
    }
    Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = createToken.generateToken(user);
          res.status(200).json({
            user,
            token
          });
        } else {
          return res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(error => res.status(500).json(error.message));
});

//logout
router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy(error => {
      if (error) {
        res.send(error);
      } else {
        res.send("You are not logged out");
      }
    })
  } else {
    res.end("Goodbye");
  }
});
  
module.exports = router;