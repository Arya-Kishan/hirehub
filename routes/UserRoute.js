const express = require('express');
const { getUser, addUser, updateUser, deleteUser, getAllUser, searchUser, loginUser } = require('../controllers/UserController');

const router = express.Router();

router.get("/", getUser)
    .post("/login", loginUser)
    .get("/all", getAllUser)
    .get("/search", searchUser)
    .post("/", addUser)
    .patch("/", updateUser)
    .delete("/", deleteUser)

module.exports = router;