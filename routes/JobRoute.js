const express = require('express');
const { getJob, addJob, updateJob, deleteJob, getAllJob } = require('../controllers/JobController');

const router = express.Router();

router.get("/", getJob)
    .get("/all", getAllJob)
    .post("/", addJob)
    .patch("/", updateJob)
    .delete("/", deleteJob)

module.exports = router;