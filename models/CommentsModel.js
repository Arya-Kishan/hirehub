const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comment: {
        type: String,
    },

});

exports.Comment = mongoose.model("Comment", commentSchema);