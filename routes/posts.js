const { json } = require('body-parser');
const express = require('express');
const router = express.Router();
const Post = require('../models/db');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();    
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});

router.post('/', async (req, res) => {
    const post = new Post({
        name: req.body.name,
        birthday: req.body.birthday,
        weight: req.body.weight,
	    steps: req.body.steps,
        isRunning: req.body.isRunning
    });
    try {
	    const savedPost = await post.save()
	    res.json(savedPost);
    } catch (err) {
        res.json({message: err})
    }
});

router.get('/:postId', async (req, res) => {
    try {
	    const post = await Post.findById(req.params.postId);
	    res.json(post);
    } catch (err) {
        res.json({message: err});
    }
});

router.delete('/:postId', async (req, res) => {
    try {
	const removedPost = await Post.remove({_id: req.params.postId});
        res.json(removedPost);
    } catch(err) {
        res.json({message: err});
    }
});

router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId},
            { $set: {
                name: req.body.name,
                birthday: req.body.birthday,
                weight: req.body.weight,
                steps: 0,
                isRunning: false
            }});
        res.json(updatedPost);
    } catch (err) {
        res.json({message: err});
    }
});

router.patch('/run/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId},
            { $set: {
                name: req.body.name,
                birthday: req.body.birthday,
                weight: req.body.weight,
                steps: 1,
                isRunning: true
            }});
        res.json(updatedPost);
    } catch (err) {
        res.json({message: err});
    }
});

router.get('/run/:postId', async (req, res) => {
    try {
	    const post = await Post.findById(req.params.postId);
	    res.json(post);
    } catch (err) {
        res.json({message: err});
    }
});


module.exports = router;
