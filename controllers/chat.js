const { Op } = require('sequelize');
const Chat = require('../models/Chat');
const User = require('../models/User');




//? - fetches recent chat message details
exports.recentMessage = async(req, res) => {
 
  const { recMsgId } = req.params;
  console.log('Recent-Id : ' +recMsgId);
  console.log('Current UserId : ' +req.user.id);

  try {

    const chatMessage = await Chat.findOne({
      where: { id: recMsgId },
      include: [
        { model: User, as: 'sender' },
        { model: User, as: 'receiver' }
      ]
    });
    
    if (!chatMessage) {
      console.log('No chat message found with id: ' + recMsgId);
      return res.status(404).json({ error: 'Chat message not found' });
    }
  
    console.log('Recent-Message:', chatMessage.dataValues);
  
    const formattedMessage = {
      id: chatMessage.id,
      message: chatMessage.message,
      senderId: chatMessage.senderId,
      senderName: chatMessage.sender.name,
      currentId: req.user.id,
      currentUser: req.user.name,
      receiverId: chatMessage.receiverId,
      receiverName: chatMessage.receiver.name,
      fileUrl: chatMessage.fileUrl,
      createdAt: chatMessage.createdAt
    };
    
    return res.status(200).json({ message: 'Recent chat message fetched successfully', recentMessage: formattedMessage });

  } catch(error) {
     
    return res.status(500).json({ message: error.message || "Internal Server Error" });

  }

}




//? - sends a new chat message
exports.sendMessage = async(req, res) => {
   
  const { recId } =  req.params;
  console.log('Receiver-Id : ' +recId);

  const senderId = req.user.id;
  console.log('Sender-Id  : ' +senderId);

  const { userType, message, imageUrl} = req.body;
  console.log('Message : ', message);

  try {

    const newChatMessage = await Chat.create({
      senderId : senderId,
      receiverId : recId,
      message : message,
      fileUrl : imageUrl,
      userType: userType,
      userId : req.user.id
    });
    
    return res.status(201).json({ message: 'Chat message saved successfully', messages: newChatMessage });

  } catch(error) {
     
    return res.status(500).json({ message: error.message || "Internal Server Error" });

  }
      
};




//? - retrieves chat messages
exports.fetchMessages = async(req, res) => {

  const { receiverId } =  req.params;
  console.log('Receiver-Id : ' +receiverId);

  const senderId = req.user.id;
  console.log('Sender-Id  : ' +senderId);

  const uType = req.query.uType;
  console.log('User-Type  : ' +uType); 
  
  try {

    let messages;

    if (uType === 'user') {

      messages = await Chat.findAll({
        where: {
          [Op.or]: [
            { senderId: senderId, receiverId: receiverId, userType: uType },
            { senderId: receiverId, receiverId: senderId, userType: uType }
          ]
        },
        include: [
          { model: User, as: 'sender' },
          { model: User, as: 'receiver' }
        ]
      });

    } else if (uType === 'group') {
      
      messages = await Chat.findAll({
        where: {
          receiverId: receiverId,
          userType: uType
        },
        include: [
          { model: User, as: 'sender' },
          { model: User, as: 'receiver' },
        ]
      });

    } else {
      throw new Error('Invalid user type');
    }

    const formattedMessages = messages.map(message => {
      return {
        id: message.id,
        message: message.message,
        fileUrl: message.fileUrl,
        senderId: message.senderId,
        senderName: message.sender.name,
        currentId: req.user.id,
        currentUser: req.user.name,
        receiverId: message.receiverId,
        receiverName: message.receiver.name,
        createdAt: message.createdAt
      };
    });

    return res.status(200).json({ message: 'Chat messages fetched successfully', messages: formattedMessages });

  } catch(error) {
    
    return res.status(500).json({ message: error.message || "Internal Server Error" });

  }
      
};