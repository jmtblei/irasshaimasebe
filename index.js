require('dotenv').config();

const server = require('./api/server.js');

const port = process.env.PORT || 9999;
server.listen(port, () => console.log(`\n** Listening to port ${port} **\n`)); 