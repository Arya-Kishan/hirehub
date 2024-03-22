const { User } = require("../models/UserModel");


exports.loginUser = async (req, res) => {
    try {
        console.log("LOGIN USER");
        const user = await User.findOne({ email: req.body.email })
        console.log(user);

        if (req.body.password == user.password) {
            console.log("correct");
            res.status(200).json(user);
        } else {
            res.status(400).json({ 'message': 'Wrong Password' });
        }

    } catch (error) {
        console.log(error);
        console.log("Error in Login user");
        res.status(400).json({ 'message': 'Error in Login user' });
    }
}

exports.getAllUser = async (req, res) => {
    try {

        if (req.query.search) {
            const docs = await User.find({ "name": { $regex: '^' + req.query.search, $options: 'i' } });
            res.status(200).json(docs);
        } else if (req.query.sort && req.query.order) {
            const docs = await User.find().sort({ [req.query.sort]: Number(req.query.order) });
            res.status(200).json(docs);
        } else {
            const docs = await User.find();
            res.status(200).json(docs);
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting All Jobs' });
    }
}

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.query;
        const user = await User.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error in getting user by id' });
    }
}

exports.addUser = async (req, res) => {
    try {

        const user = new User(req.body)
        let newUser = await user.save();

        res.status(200).json(newUser);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error in making new user' });
    }
}

exports.updateUser = async (req, res) => {
    try {

        const { userId } = req.query;
        const updateUser = await User.findByIdAndUpdate(userId, req.body, { new: true })
        res.status(200).json(updateUser);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error in Updating User' });
    }
}

exports.deleteUser = async (req, res) => {
    try {

        const { userId } = req.query;
        const updateUser = await User.findByIdAndDelete(userId)
        res.status(200).json(updateUser);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error in Deleting User' });
    }
}

exports.searchUser = async (req, res) => {
    try {
        console.log("Searching User");
        const { userName } = req.query;
        console.log(userName);
        const updateUser = await User.find({ name: userName })
        res.status(200).json(updateUser);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error in Deleting User' });
    }
}