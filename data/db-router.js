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

//POST /api/posts
router.post('/', (req, res) => {
    db.insert(req.body)
        .then(post => {
            if(req.body.title && req.body.contents !== "") {
                res.status(201).json(post)
            } else {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database", err })
        })
})

//POST /api/posts/:id/comments
router.post('/:id/comments', (req, res) => {
    db.insertComment(req.body)
        .then(comment => {
            if(req.params.id === undefined) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else if(req.body.text === "") {
                res.status(400).json({ errorMessage: "Please provide text for the comment." })
            } else {
                res.status(201).json(comment)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the comment to the database", err})
        })
})

//PUT /api/posts/:id
router.put("/:id", (req, res) => {
    const changes = req.body;
    const id = req.params.id;

    db.update(id, changes)
        .then(post => {
            if (id === undefined) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else if (req.body.title && req.body.contents === "") {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be modified.", err })
        })
})

//DELETE /api/posts/:id
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
        .then(post => {
            if (post === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).end()
            }
        })
        .catch(err => {
           res.status(500).json({ error: "The post could not be removed", err }) 
        })
})

module.exports = router;