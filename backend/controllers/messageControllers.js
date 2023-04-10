const expressAsyncHandler = require('express-async-handler');
const Message = require("../Models/MessageModel");
const Chat = require('../Models/ChatModel');

const sendMessage = expressAsyncHandler(async (req, res) => {
    const  {content, chatId } = req.body;\

    if(!content || !chatId) {
        console.log("Invalid Data passed into request");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender : req.user._id,
        content : content,
        chat: chatId,
    };

    try{
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic").execPopulate();
        message = await message.populate("chat").execPopulate();
        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name pic email'
        });
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage : message,
        });
        res.json(message);
    }
    catch(error) {
        res.status(400);
        throw new Error(error.message);
    }
});
module.exports = {sendMessage}
