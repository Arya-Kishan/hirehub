const { User } = require("../models/UserModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { getUrl } = require("../Helper/Cloudinary");
const { sendMail } = require("../Helper/NodeMailer");
const { Job } = require("../models/JobModel");
const { Post } = require("../models/PostsModel");
const { Blog } = require("../models/BlogsModel");
const Razorpay = require("razorpay")

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

//BELOW ID USED DURING PAYMENT FOR STORING USER ID WHO HAS SUBSCRIBE FOR PRO 
let paymentUserId;

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

        let user = await User.findByIdAndUpdate(userId, { $set: { active: Date.now() } })

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

        let user = await User.findOneAndUpdate({ email: email }, { $set: { active: Date.now() } }).populate({
            path: 'friends',
            select: "-password"
        })

        // CHECKING PASSWORD WITH HASHED PASSWORD
        let comparePassword = await bcrypt.compare(password, user.password)

        // CREATING JWT TOKEN
        const jwtToken = jwt.sign({ userEmail: email, userId: user._id }, "JWT_SECRET");


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

        const updateUser1 = await User.findByIdAndDelete(userId)
        const updateUser2 = await Job.deleteMany({ postedBy: userId })
        const updateUser3 = await Post.deleteMany({ userId: userId })
        const updateUser4 = await Blog.deleteMany({ userId: userId })

        res.status(200).json("Deleted Permanently");

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

exports.forgotPassword = async (req, res) => {

    try {

        const { email } = req.body;

        const user = await User.findOne({ email: email })

        if (user) {

            const token = crypto.randomBytes(48).toString('hex');
            user.resetPasswordToken = token;
            await user.save();


            const subject = "Reset Password"
            const html = `<p>Click <a href=${'https://arya-hirehub.netlify.app/changePassword?email=' + email + '&token=' + token}>here</a> to reset your password</p>`
            let response = await sendMail({ email, subject, html })

            if (response == "UNABLE TO SEND EMAIL") {
                res.status(400).json(response)
            } else {
                res.status(200).json(response)
            }

        } else {
            res.status(400).json("NO USER FOUND WITH GIVEN EMAIL")
        }

    } catch (error) {
        console.log(error);
        console.log("------- ERROR IN FORGOT PASSWORD ----------");
        res.status(400).json("ERROR IN FORGOT PASSWORD")
    }

}


exports.changePassword = async (req, res) => {

    try {

        console.log(req.body);
        const { newPassword, email, token } = req.body;

        const user = await User.findOne({ email: email })

        if (token == user.resetPasswordToken) {

            const hashPassword = await bcrypt.hash(newPassword, 15);
            user.password = hashPassword;
            await user.save()

            console.log(user);

            res.status(200).json("PASSWORD CHANGED")

        } else {
            res.status(200).json("UNAUTHORISED TOKEN PASSWORD CAN'T CHANGED")
        }

    } catch (error) {
        console.log(error);
        console.log("------- ERROR IN CHANGING PASSWORD ----------");
        res.status(400).json("ERROR IN CHANGING PASSWORD")
    }

}


exports.getFeatureOrderId = async (req, res) => {

    try {

        console.log(req.body);

        paymentUserId = req.body.userId;

        var options = {
            amount: req.body.amount,
            currency: "INR"
        };

        const order = await instance.orders.create(options);
        res.status(200).json(order)

    } catch (error) {
        console.log(error);
        res.status(400).json("PRO FEATURE ORDER ID NOT GENERATED")
    }

}

exports.verifyFeatureOrderId = async (req, res) => {

    try {

        console.log("-------------VERIFYING ----------");
        console.log(req.body);

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");

        const isAuthentic = expectedSignature === razorpay_signature;

        if (isAuthentic) {

            await User.findByIdAndUpdate(paymentUserId, { upgrade: { pro: true, ...req.body } })

            console.log("PAYMENT SUCCESSFUL");

            res.redirect(
                `https://arya-hirehub.netlify.app/success?reference=${razorpay_payment_id}`
            );

        } else {

            // WE WILL SHOW FAILURE AS IN FAILURE WE DON'T GET REFERENCE PAYMENT ID
            console.log("PAYMENT FAILED IN VERIFICATION COZ IT'S NOT AUTHENTIC ID'S");
            res.redirect(
                `https://arya-hirehub.netlify.app/success}`
            );
        }

    } catch (error) {
        console.log(error);
        console.log("PAYMENT VERIFICATION FAILED");
        res.status(400).json("PAYMENT VERIFICATION FAILED")
    }

}
