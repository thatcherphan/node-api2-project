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

//GET /api/posts/:id
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.findById(id)
        .then(post => {
            if (post.length != 0) {
                res.status(200).json(post)
            } else  {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved.", err })
        })
})

//GET /api/posts/:id/comments
router.get('/:id/comments', async (req, res) => {
    try {
        const comments = await db.findPostComments(req.params.id);
        if (comments.length > 0) {
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } 
    } catch(error) {
        console.log(error)
        res.status(500).json({ error: "The comments information could not be retrieved.", error })
    }
})

module.exports = router;