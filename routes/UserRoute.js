const express = require('express');
const { getUser, addUser, updateUser, deleteUser, getAllUser, searchUser } = require('../controllers/UserController');

const router = express.Router();

router.get("/", getUser)
    .get("/all", getAllUser)
    .get("/search", searchUser)
    .post("/", addUser)
    .patch("/", updateUser)
    .delete("/", deleteUser)

module.exports = router;