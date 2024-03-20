const { Job } = require("../models/JobModel");
const { User } = require("../models/UserModel");

exports.getAllJob = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting All Jobs' });
    }
}

exports.getJob = async (req, res) => {
    try {
        const { jobId } = req.query;
        const user = await Job.findById(jobId);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting Job By Id' });
    }
}

exports.addJob = async (req, res) => {
    try {
        
        const job = new Job(req.body)
        let newUser = await job.save();
        res.status(200).json(newUser);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Making New Job', "error": error });
    }
}

exports.updateJob = async (req, res) => {
    try {

        const { jobId } = req.query;
        const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true })
        res.status(200).json(updatedJob);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Updating Job' });
    }
}

exports.deleteJob = async (req, res) => {
    try {

        const { jobId } = req.query;
        const updateUser = await Job.findByIdAndDelete(jobId)
        res.status(200).json(updateUser);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Deleting Job' });
    }
}