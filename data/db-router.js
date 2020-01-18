const express = require('express');
const db = require('./db');

const router = express.Router();

//GET /api/posts
router.get('/', (req, res) => {
    db.find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved.", err })
        })
})



module.exports = router;