const { Post } = require("../models/PostsModel");
const { getUrl } = require("../Helper/Cloudinary");


exports.getAllPosts = async (req, res) => {
    try {
        const doc = await Post.find().populate("userId");
        res.status(200).json(doc);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting All Posts' });
    }
}

exports.getUserPostsById = async (req, res) => {
    try {
        const { userId } = req.query;
        const doc = await Post.find({userId:userId});
        res.status(200).json(doc);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting User Post By Id' });
    }
}

exports.addPost = async (req, res) => {
    try {

        // console.log(req.body);
        // const post = new Post(req.body)
        // let newPost = await post.save();
        // res.status(200).json(newPost);


        let picUrl = await getUrl(req.files?.resume)

        const post = new Post({ ...req.body, picUrl: picUrl })
        let newPost = await post.save();
        res.status(200).json(newPost);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Making New Posts' });
    }
}

exports.updatePostById = async (req, res) => {
    try {

        const { postId } = req.query;
        const updatedJob = await Post.findByIdAndUpdate(postId, req.body, { new: true })
        res.status(200).json(updatedJob);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Updating Posts' });
    }
}

exports.deletePostById = async (req, res) => {
    try {

        const { postId } = req.query;
        const updateUser = await Post.findByIdAndDelete(postId)
        res.status(200).json(updateUser);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Deleting Post' });
    }
}