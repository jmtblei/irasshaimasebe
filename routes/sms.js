const express = require('express');
const router = express.Router();
const restricted = require('../data/workers/auth/restricted');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

//sends sms to customer alerting them a table is ready
router.post("/ready", restricted, (req, res) => {
    const size = req.body.size;
    const to = req.body.to;
    client.messages
        .create({
            body: `We are ready to accommodate your reservation for ${size}. Please come to the front with all members to be seated!`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+1${to}`
        })
        .then(sent => {
            return res.status(200).json(sent);
        })
        .catch(err => res.send(err))
})

//sends sms to customer alerting them no more reservations available at this time
router.post("/sorry", restricted, (req, res) => {
    const to = req.body.to;
    client.messages
        .create({
            body: 'Unfortunately, we are unable to accommodate any reservations at this time. Sorry for the inconvenience.',
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+1${to}`
        })
        .then(sent => {
            return res.status(200).json(sent);
        })
        .catch(err => res.send(err))
})

module.exports = router;