const express = require('express');
const { getUserPostsById, getAllPosts, addPost, updatePostById, deletePostById } = require('../controllers/PostsController');

const router = express.Router();

router.get("/", getUserPostsById)
    .get("/all", getAllPosts)
    .post("/", addPost)
    .patch("/", updatePostById)
    .delete("/", deletePostById)

module.exports = router;