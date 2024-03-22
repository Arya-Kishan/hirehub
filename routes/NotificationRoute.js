const express = require('express');
const { getUserNotificationById, addNotification, deleteNotificationById } = require('../controllers/NotificationController');

const router = express.Router();

router.get("/", getUserNotificationById)
    .post("/", addNotification)
    .delete("/", deleteNotificationById)

module.exports = router;