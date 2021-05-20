const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Post = require('../models/db');
const OK = 200;
const ERROR = 500;

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(OK);
        res.json(posts);
    } catch (err) {
        res.status(ERROR);
        res.json({ message: err });
    }
});

router.post('/', async (req, res) => {
    const post = new Post({
        name: req.body.name,
        birthday: req.body.birthday,
        weight: req.body.weight
    });
    try {
        const savedPost = await post.save()
        res.status(OK);
        res.json(savedPost);
    } catch (err) {
        res.status(ERROR);
        res.json({ message: err })
    }
});

router.get('/:ChickenId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.ChickenId);
        res.status(OK);
        res.json(post);
    } catch (err) {
        res.status(ERROR);
        res.json({ message: err });
    }
});

router.delete('/:ChickenId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.ChickenId });
        res.status(OK);
        res.json(removedPost);
    } catch (err) {
        res.status(ERROR);
        res.json({ message: err });
    }
});

router.patch('/:ChickenId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.ChickenId },
            {
                $set: {
                    name: req.body.name,
                    birthday: req.body.birthday,
                    weight: req.body.weight,
                    steps: 0,
                    isRunning: false
                }
            });
        res.status(OK);
        res.json(updatedPost);
    } catch (err) {
        res.status(ERROR);
        res.json({ message: err });
    }
});

router.patch('/run/:ChickenId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.ChickenId },
            {
                $set: {
                    name: req.body.name,
                    birthday: req.body.birthday,
                    weight: req.body.weight,
                    steps: 1,
                    isRunning: true
                }
            });
        res.status(OK);
        res.json(updatedPost);
    } catch (err) {
        res.status(ERROR);
        res.json({ message: err });
    }
});

router.get('/run/:ChickenId', async (req, res) => {
    try {
        const post = await Post.findById(req.params.ChickenId);
        res.status(OK);
        res.json(post);
    } catch (err) {
        res.status(ERROR);
        res.status.res.json({ message: err });
    }
});

module.exports = router;