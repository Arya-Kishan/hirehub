const express = require('express');
const { getUser, createUser, updateUser, deleteUser, getAllUser, searchUser, loginUser, checkUserWithJwt, logInAsGuest, changePassword, forgotPassword, getFeatureOrderId, verifyFeatureOrderId } = require('../controllers/UserController');

const router = express.Router();

router.get("/", getUser)
    .post("/login", loginUser)
    .get("/all", getAllUser)
    .get("/guest", logInAsGuest)
    .get("/checkUserWithJwt", checkUserWithJwt)
    .get("/search", searchUser)
    .post("/", createUser)
    .post("/forgotPassword", forgotPassword)
    .post("/changePassword", changePassword)
    .post("/getFeature", getFeatureOrderId)
    .post("/verifyFeature", verifyFeatureOrderId)
    .patch("/", updateUser)
    .delete("/", deleteUser)

module.exports = router;