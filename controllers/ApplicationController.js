const { Job } = require("../models/JobModel");
const { Application } = require("../models/ApplicationModel");
const { getUrl } = require("../Helper/Cloudinary");


exports.getAllApplication = async (req, res) => {
    try {
        const application = await Application.find();
        res.status(200).json(application);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting All Application' });
    }
}

exports.getApplication = async (req, res) => {
    try {
        const { applicationId } = req.query;
        const user = await Application.findById(applicationId);
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting Application By Id' });
    }
}

exports.addApplication = async (req, res) => {
    try {

        let url = await getUrl(req.files?.resume)

        const application = new Application({ ...req.body, resume: url })
        let newApplication = await application.save();
        res.status(200).json(newApplication);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Making New Application' });
    }
}

exports.updateApplication = async (req, res) => {
    try {

        const { applicationId } = req.query;
        const updatedJob = await Application.findByIdAndUpdate(applicationId, req.body, { new: true })
        res.status(200).json(updatedJob);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Updating Application' });
    }
}

exports.deleteApplication = async (req, res) => {
    try {

        const { applicationId } = req.query;
        const updateUser = await Application.findByIdAndDelete(applicationId)
        res.status(200).json(updateUser);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Deleting Application' });
    }
}