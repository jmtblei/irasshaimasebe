const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

module.exports = {
    smsReady,
    smsSorry
};

function smsReady(to, size) {
    client.messages
        .create({
            body: `We are ready to accommodate your reservation for ${size}. Please come to the front with all members to be seated!`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+1${to}`
        })
};

function smsSorry(to) {
    client.messages
        .create({
            body: 'Unfortunately, we are unable to accommodate any reservations at this time. Sorry for the inconvenience.',
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+1${to}`
        })
}