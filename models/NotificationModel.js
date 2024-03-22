const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

});

exports.Notification = mongoose.model("Notification", notificationSchema);