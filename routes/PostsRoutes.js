const express = require('express');
const { getUserPostsById, getAllPosts, addPost, updatePostById, deletePostById, addLikeOrComment } = require('../controllers/PostsController');

const router = express.Router();

router.get("/", getUserPostsById)
    .get("/all", getAllPosts)
    .post("/", addPost)
    .post("/likeComment", addLikeOrComment)
    .patch("/", updatePostById)
    .delete("/", deletePostById)

module.exports = router;