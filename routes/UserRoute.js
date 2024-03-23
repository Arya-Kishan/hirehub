const express = require('express');
const { getUser, createUser, updateUser, deleteUser, getAllUser, searchUser, loginUser, checkUserWithJwt } = require('../controllers/UserController');

const router = express.Router();

router.get("/", getUser)
    .post("/login", loginUser)
    .get("/all", getAllUser)
    .get("/checkUserWithJwt", checkUserWithJwt)
    .get("/search", searchUser)
    .post("/", createUser)
    .patch("/", updateUser)
    .delete("/", deleteUser)

module.exports = router;