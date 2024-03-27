const express = require('express');
const { getUserBlogsById, getAllBlogs, addBlog, updateBlogById, deleteBlogById } = require('../controllers/BlogController');

const router = express.Router();

router.get("/", getUserBlogsById)
    .get("/all", getAllBlogs)
    .post("/", addBlog)
    .patch("/", updateBlogById)
    .delete("/", deleteBlogById)

module.exports = router;