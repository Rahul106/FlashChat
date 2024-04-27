const Chat = require('../models/Chat');
const User = require('../models/User');




//* - function to creates a new user
exports.sendMessage = async(req, res) => {
    
  try {
    
    const { message } = req.body;
    
    console.log('UserId : ', req.user.id);
    console.log('Message : ', message);
    
    const newChatMessage = await Chat.create({
      userId : req.user.id,
      message
    });
    
    return res.status(201).json({ message: 'Chat message saved successfully', chatMessage: newChatMessage });

  } catch(error) {
     
    return res.status(500).json({ message: error.message || "Internal Server Error" });

  }
      
};





exports.fetchMessages = async(req, res) => {
    
  try {
    
    const messages = await Chat.findAll({
      include: {
        model: User,
        attributes: ['id', 'name']
      }
    });
   
    const formattedMessages = messages.map(message => {
      return {
        id: message.id,
        message: message.message,
        userId: message.userId,
        senderName: message.user.name,
        currentUser: req.user.name,
        senderId: message.user.id,
        createdAt: message.createdAt
      };
    });

    return res.json(formattedMessages);

  } catch(error) {
    
    return res.status(500).json({ message: error.message || "Internal Server Error" });

  }
      
};