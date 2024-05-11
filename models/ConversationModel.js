const mongoose = require("mongoose")

const conversationModel = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        default:[],
    }]
}, { timestamps: true });

exports.Conversation = mongoose.model("Conversation", conversationModel);