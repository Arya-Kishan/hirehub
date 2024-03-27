const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    description: {
        type: String,
    },

}, { timestamps: true });

exports.Blog = mongoose.model("Blog", blogSchema);