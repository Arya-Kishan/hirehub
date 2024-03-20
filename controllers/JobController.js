const { Job } = require("../models/JobModel");

exports.getAllJob = async (req, res) => {
    try {

        if (req.query.search) {
            const jobs = await Job.find({ "title": { $regex: '^' + req.query.search, $options: 'i' } });
            res.status(200).json(jobs);
        } else if (req.query.sort && req.query.order) {
            const jobs = await Job.find().sort({ [req.query.sort]: Number(req.query.order) });
            res.status(200).json(jobs);
        } else {
            const jobs = await Job.find();
            res.status(200).json(jobs);
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting All Jobs' });
    }
}

exports.getJob = async (req, res) => {
    try {
        const { jobId, postedBy } = req.query;

        if (jobId) {
            // helps in getting job details
            const docs = await Job.findById(jobId);
            res.status(200).json(docs);
        } else if (postedBy) {
            // helps in getting job posted by employer
            const docs = await Job.find({ postedBy: postedBy });
            res.status(200).json(docs);
        } else {
            res.status(400).json("CAN'T GET QUERY FOR JOB");
        }

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