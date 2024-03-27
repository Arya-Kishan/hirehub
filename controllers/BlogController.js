const { Blog } = require("../models/BlogsModel");

exports.getAllBlogs = async (req, res) => {
    try {
        const doc = await Blog.find().populate("userId");
        res.status(200).json(doc);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting All Blogs' });
    }
}

exports.getUserBlogsById = async (req, res) => {
    try {
        const { userId } = req.query;
        const doc = await Blog.find({ userId: userId }).populate("userId");
        res.status(200).json(doc);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting User Blog By Id' });
    }
}

exports.addBlog = async (req, res) => {
    try {

        console.log("-------------ADDING BLOG----------");

        const blog = new Blog(req.body)
        let doc = await blog.save();
        res.status(200).json(doc);

    } catch (error) {
        console.log(error);
        res.status(400).json({ data: 'ERROR IN UPLOADING BLOG', error: error });
    }
}

exports.updateBlogById = async (req, res) => {
    try {

        const { blogId } = req.query;
        const doc = await Blog.findByIdAndUpdate(blogId, req.body, { new: true }).populate("userId")
        res.status(200).json(doc);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Updating Blog' });
    }
}

exports.deleteBlogById = async (req, res) => {
    try {
        const { blogId } = req.query;
        const doc = await Blog.findByIdAndDelete(blogId)
        res.status(200).json(doc);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Deleting Blog' });
    }
}