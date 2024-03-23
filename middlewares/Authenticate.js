const jwt = require("jsonwebtoken");
const { User } = require("../models/UserModel");

exports.jwtAuthenticateUser = async (req, res, next) => {

    console.log("----verify routes with jwt token----");

    try {

        const jwtToken = req?.headers["x-jwt-routes"];


        const verfiyToken = jwt.verify(jwtToken, "JWT_SECRET")

        const { userId } = verfiyToken;

        const user = await User.findById(userId)

        if (user) {
            next()
        } else {
            res.status(400).json("ERROR IN JWT AUTHENTICATION")
        }

    } catch (error) {
        res.status(400).json("ERROR IN JWT AUTHENTICATION")
    }

}