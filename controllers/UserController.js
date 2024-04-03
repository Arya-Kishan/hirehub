const { User } = require("../models/UserModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { getUrl } = require("../Helper/Cloudinary");

exports.logInAsGuest = async (req, res) => {
    try {
        const user = await User.findById("65f9b6bf2f8c7fe881118a90");

        // CREATING JWT TOKEN
        const jwtToken = jwt.sign({ userEmail: user.email, userId: user._id }, "JWT_SECRET");
        console.log(jwtToken);

        res.set("X-jwt-routes", jwtToken);
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(400).json("ERROR IN LOGIN AS GUEST");
    }
}


exports.checkUserWithJwt = async (req, res) => {
    try {

        console.log("------PRE CHECK USER WITH JWT TOKEN ------");

        const { checkUserWithJwt: jwtToken } = req.query;

        const verfiyToken = jwt.verify(jwtToken, "JWT_SECRET")

        const { userId } = verfiyToken;

        const user = await User.findById(userId)

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).json("ERROR IN PRE CHECK USER NOT FOUND")
        }

    } catch (error) {
        console.log(error);
        res.status(400).json("ERROR IN PRE CHECK USER WITH JWT");
    }
}


exports.createUser = async (req, res) => {
    try {

        console.log(req.body);
        console.log("-----CREATING NEW USER-----");

        const { email, password } = req.body;

        // CREATING HASHED PASSWORD
        const hashPassword = await bcrypt.hash(password, 15);

        // SAVING NEW USER INFORMATION TO DATABASE WITH HASHED PASSWORD
        const user = new User({ ...req.body, password: hashPassword });
        let newUser = await user.save();

        // CREATING JWT TOKEN
        const jwtToken = jwt.sign({ userEmail: email, userId: user._id }, "JWT_SECRET");
        console.log(jwtToken);

        // SENDING JWT TOKEN AS HEADERS TO FRONTEND FOR FURTHER AUTHENTICATION PURPOSE WITH JWT 
        res.set("X-jwt-routes", jwtToken);
        res.status(200).json(newUser);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error in making new user' });
    }
}

exports.loginUser = async (req, res) => {
    try {
        console.log("---LOGIN USER----");

        const { email, password } = req.body;

        const user = await User.findOne({ email: email }).populate("friends")
        console.log(user);

        // CHECKING PASSWORD WITH HASHED PASSWORD
        let comparePassword = await bcrypt.compare(password, user.password)

        // CREATING JWT TOKEN
        const jwtToken = jwt.sign({ userEmail: email, userId: user._id }, "JWT_SECRET");
        console.log(jwtToken);


        if (comparePassword) {
            console.log("correct password matches");
            res.set("X-jwt-routes", jwtToken);
            res.status(200).json(user);
        } else {
            res.status(400).json("WRONG PASSWORD");
        }

    } catch (error) {
        console.log(error);
        console.log("Error in Login user");
        res.status(400).json("ERROR IN LOGIN USER");
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
        const user = await User.findById(userId).populate("friends");
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error in getting user by id' });
    }
}

exports.updateUser = async (req, res) => {
    try {

        console.log(req.body);
        console.log(req.query);
        console.log(req.files);
        const { userId } = req.query;

        if (req.body.savedJobs) {

            const updateUser = await User.findByIdAndUpdate(userId, { $push: { savedJobs: req.body.savedJobs } }, { new: true })
            res.status(200).json(updateUser);

        } else {
            let interest = req.body.interest.split(",")
            let socials = req.body.socials.split(",")
            socials = [{ instagram: socials[0] }, { linkedIn: socials[1] }, { twitter: socials[2] }]

            let bannerImg = null;
            let profilePic = null;

            if (req.body.bannerImg == 'undefined') {
                delete req.body.bannerImg
            }

            if (req.body.profilePic == 'undefined') {
                delete req.body.profilePic
            }


            if (req.files) {

                if (req.files.bannerImg) {
                    console.log("CHANGING BANNER IMG")
                    bannerImg = await getUrl(req.files.bannerImg)
                }

                if (req.files.profilePic) {
                    console.log("CHANGING PROFILE PIC IMG")
                    profilePic = await getUrl(req.files.profilePic)
                }

                req.body = { ...req.body, bannerImg: bannerImg, profilePic: profilePic }

            }

            let newData = { ...req.body, interest: interest, socials: socials, phone: Number(req.body.phone) }
            console.log(newData);

            const updateUser = await User.findByIdAndUpdate(userId, newData, { new: true })
            res.status(200).json(updateUser);
        }

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