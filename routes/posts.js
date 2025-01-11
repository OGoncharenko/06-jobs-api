const express = require('express');
const router = express.Router();

const {getAllPosts, getPost, createPost, updatePost, deletePost} = require('../controllers/posts');

router.route('/').get(getAllPosts).post(createPost);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);

module.exports = router