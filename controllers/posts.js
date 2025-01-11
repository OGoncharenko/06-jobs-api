const Post = require('../models/Post');
const {StatusCodes} = require('http-status-codes');
const {BadRequestError, NotFoundError} = require('../errors');

const getAllPosts = async (req, res) => {
  res.send('get all posts');
}
const getPost = async (req, res) => {
  res.send('get single post');
}
const createPost = async (req, res) => {
  const post = await Post.create({ ...req.body, createdBy: req.user.userId });
  res.status(StatusCodes.CREATED).json({ post });
}
const updatePost = async (req, res) => {
  res.send('update post');
}
const deletePost = async (req, res) => {
  res.send('delete post');
}

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}