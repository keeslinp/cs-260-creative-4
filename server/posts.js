const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

//
// Posts
//

const postSchema = new mongoose.Schema({
	createDate: Number,
	updateDate: Number,
  title: String,
	content: String,
});

const Post = mongoose.model('Post', postSchema);

router.get('/', async (req, res) => {
  try {
    let posts = await Post.find();
    return res.send(posts);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  const post = new Post({
	  createDate: Date.now(),
	  content: req.body.content,
    title: req.body.title,
	  updateDate: null,
  });
	console.log(post, req.body);
  try {
    await post.save();
    return res.send(post);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
	const post = await Post.findById(req.params.id);
	post.updateDate = Date.now();
	post.content = req.body.content;
	post.title = req.body.title;
  try {
    await post.save();
    return res.send(post);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Post.deleteOne({
      _id: req.params.id
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
