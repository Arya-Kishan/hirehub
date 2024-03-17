const express = require('express');
const { getApplication, addApplication, updateApplication, deleteApplication, getAllApplication } = require('../controllers/ApplicationController');

const router = express.Router();

router.get("/", getApplication)
    .get("/all", getAllApplication)
    .post("/", addApplication)
    .patch("/", updateApplication)
    .delete("/", deleteApplication)

module.exports = router;