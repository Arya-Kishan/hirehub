const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title."],
    minLength: [3, "Title must contain at least 3 Characters!"],
    maxLength: [30, "Title cannot exceed 30 Characters!"],
  },
  description: {
    type: String,
    required: [true, "Please provide decription."],
  },
  country: {
    type: String,
    required: [true, "Please provide a country name."],
  },
  city: {
    type: String,
    required: [true, "Please provide a city name."],
  },
  location: {
    type: String,
  },
  companyName: {
    type: String
  },
  fixedSalary: {
    type: Number,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: [],
    default: []
  },
  experience: {
    type: Number,
    default: 0
  },
  appliedApplicants: {
    type: [mongoose.Schema.ObjectId],
    ref: "User",
    default: []

  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

exports.Job = mongoose.model("Job", jobSchema);