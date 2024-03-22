const { Notification } = require("../models/NotificationModel");
const { User } = require("../models/UserModel");


exports.getUserNotificationById = async (req, res) => {
    try {
        console.log("---------------getiing notification-------");
        const { userId } = req.query;

        if (userId && userId != "null") {
            const doc = await Notification.find({ receiverId: userId }).populate("senderId");
            res.status(200).json(doc);
        } else {
            res.status(400).json(`NO NOTIFICATION FOR USERID : ${userId}`);
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting Notification for user' });
    }
}

exports.addNotification = async (req, res) => {
    try {
        console.log("---------------ADDING notification-------");
        const { senderId, receiverId } = req.body;
        console.log("Sender_ID : ", senderId);
        console.log("Receiver_ID : ", receiverId);

        const doc = new Notification(req.body)
        let newDocs = await doc.save();
        res.status(200).json(newDocs);

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Adding Notification' });
    }
}

exports.deleteNotificationById = async (req, res) => {
    try {
        console.log("---------------dELETING notification-------");
        const { notificationId, requestResult } = req.query;
        console.log("Notification_Id", notificationId);
        console.log("Requestedt_Result", requestResult);

        if (requestResult == "accept") {

            const docs = await Notification.findById(notificationId)
            const { senderId, receiverId } = docs;

            const addingFriend1 = await User.updateOne({ _id: receiverId }, { $push: { friends: senderId } })
            const addingFriend2 = await User.updateOne({ _id: senderId }, { $push: { friends: receiverId } })

            const doc = await Notification.findByIdAndDelete(notificationId)

            res.status(200).json(doc);

        } else {
            const doc = await Notification.findByIdAndDelete(notificationId)
            res.status(200).json(doc);
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Deleting Notification' });
    }
}