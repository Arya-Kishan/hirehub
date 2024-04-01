const express = require('express');
const { getJob, addJob, updateJob, deleteJob, getAllJob, getCountries } = require('../controllers/JobController');

const router = express.Router();

router.get("/", getJob)
    .get("/all", getAllJob)
    .get("/country/all", getCountries)
    .post("/", addJob)
    .patch("/", updateJob)
    .delete("/", deleteJob)

module.exports = router;