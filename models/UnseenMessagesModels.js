const mongoose = require("mongoose")

const unseenMessageModel = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });

exports.UnseenMessage = mongoose.model("UnseenMessage", unseenMessageModel);