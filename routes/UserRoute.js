const express = require('express');
const { getUser, createUser, updateUser, deleteUser, getAllUser, searchUser, loginUser, checkUserWithJwt, logInAsGuest } = require('../controllers/UserController');

const router = express.Router();

router.get("/", getUser)
    .post("/login", loginUser)
    .get("/all", getAllUser)
    .get("/guest", logInAsGuest)
    .get("/checkUserWithJwt", checkUserWithJwt)
    .get("/search", searchUser)
    .post("/", createUser)
    .patch("/", updateUser)
    .delete("/", deleteUser)

module.exports = router;