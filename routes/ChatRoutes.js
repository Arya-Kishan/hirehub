const express = require('express');
const { getFriends, getMessages, addMessages, updateMessage, deleteMessage, unseenMessage } = require('../controllers/ChatController');

const router = express.Router();

router.get("/friends", getFriends)
    .post("/getMessages", getMessages)
    .post("/addMessage", addMessages)
    .post("/unseenMessage", unseenMessage)
    .patch("/", updateMessage)
    .delete("/", deleteMessage)

module.exports = router;