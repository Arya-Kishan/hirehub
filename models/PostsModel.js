const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    picUrl: {
        type: String,
        default: ""
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    comments: {
        type: [{
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            comment: String,
        }],
        default: [],
    },
    hashtags: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        default: "",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


});

exports.Post = mongoose.model("Post", postSchema);