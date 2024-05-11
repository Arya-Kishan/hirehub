const { UnseenMessage } = require("../models/UnseenMessagesModels");
const { Chat } = require("../models/ChatModel");
const { Conversation } = require("../models/ConversationModel");
const { User } = require("../models/UserModel");

exports.getFriends = async (req, res) => {
    try {

        const { userId } = req.query;
        const doc = await User.findById(userId).populate({
            path: 'friends',
            select: 'name active profilePic'
        });
        res.status(200).json(doc.friends);
    } catch (error) {
        console.log(error);
        res.status(400).json({ 'message': 'Error In Getting USER FRIENDS' });
    }
}

exports.getMessages = async (req, res) => {

    try {

        let { senderId, receiverId } = req.body;

        let getConversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } }).populate("messages")

        res.status(200).json({ message: "GETTING CONVERSATION", data: getConversation })

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'ERROR IN CREATING NEW CONVERSATION OR MESSAGE', data: null })

    }


}

exports.addMessages = async (req, res) => {

    try {
        let { senderId, receiverId, message } = req.body;

        let getConversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } })

        if (!getConversation) {
            getConversation = await Conversation.create({ participants: [senderId, receiverId] })
        }

        let newMessage = await Chat.create({ senderId, receiverId, message: message })

        if (newMessage) {
            getConversation.messages.push(newMessage._id)
        }

        await Promise.all[getConversation.save(), newMessage.save()]

        return res.status(200).json({ message: "NEW CONVERSATION OR MESSAGE ADDED CREATED", data: newMessage })

    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'ERROR IN CREATING NEW CONVERSATION OR MESSAGE', data: null })
    }
}

exports.updateMessage = async (req, res) => {

    let { messageId, newMessage } = req.body;
    console.log(req.body);

    let updatedMessage;

    updatedMessage = await Chat.findByIdAndUpdate(messageId, { message: newMessage }, { new: true })

    console.log(updatedMessage);

    res.status(200).json({ message: "UPDATED MESSAGE", data: updatedMessage })

}

exports.deleteMessage = async (req, res) => {

    let { messageId } = req.body;
    console.log(req.body);

    let updatedMessage;

    updatedMessage = await Chat.findByIdAndUpdate(messageId, { message: "Deleted..." }, { new: true })

    console.log(updatedMessage);

    res.status(200).json({ message: "UPDATED MESSAGE", data: updatedMessage })

}

exports.unseenMessage = async (req, res) => {

    try {

        console.log(req.body);
        console.log(req.query);

        if (req.query.type == 'add') {

            let doc = await UnseenMessage.create(req.body)
            doc = await doc.save();

            return res.status(200).json({ message: "NEW UNSEEN MESSAGE ADDED", data: doc })

        } else if (req.query.type == 'get') {

            let doc = await UnseenMessage.find({ receiverId: req.body.receiverId })

            return res.status(200).json({ message: "GETTING UNSEEN MESSAGE ", data: doc })

        } else if (req.query.type == "delete") {

            console.log(req.body);

            req.body.forEach(async (e) => {
                await UnseenMessage.findByIdAndDelete(e._id)
            })

            return res.status(200).json({ message: "DELETED UNSEEN MESSAGE FROM BACKEND", data: "apple" })

        }


    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'ERROR IN ADDING UNSEEN MESSAGE', data: null })
    }


}
