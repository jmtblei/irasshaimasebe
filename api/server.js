const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const authRoutes = require('../routes/auth');
const userRoutes = require('../routes/user');
const resRoutes = require('../routes/reservation');

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRoutes);
server.use('/api/users', userRoutes);
server.use('/api/reservations', resRoutes);

server.get('/', (req, res) => {
    res.send('Henlo fren!')
});

module.exports = server;