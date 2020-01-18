const express = require('express');

const dbRouter = require('./data/db-router');

const server = express();

server.use(express.json());

server.use('/api/posts', dbRouter);

server.get('/', (req, res) => {
    res.send('This api is running!')
})

module.exports = server;