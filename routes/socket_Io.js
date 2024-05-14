const { fn, Sequelize, col, Op } = require('sequelize');


module.exports = (io, socket) => {
    const addMessage = async (data, cb) => {
        // Your message handling logic here
        
        // Emit event to all clients
        io.emit('message:receive-message', data.message, socket.user.name);

        cb(); // Call the callback function if needed
    };

    // Listen for 'message:send-message' event from clients
    socket.on('message:send-message', addMessage);
};
