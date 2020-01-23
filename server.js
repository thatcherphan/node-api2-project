const express = require('express');

const dbRouter = require('./data/db-router');

const server = express();

server.use(express.json());

server.use('/api/posts', dbRouter);

server.get('/', (req, res) => {
    const messageOfTheDay = process.env.MOTD;
    res.send({motd: messageOfTheDay});
})

module.exports = server;