//* imports modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const morgan = require('morgan')
const sequelize = require("./utils/database");
const {createServer} = require('http')
const {Server} = require('socket.io')




//* set-up server
const app = express();
const server = createServer(app);
const io = new Server(server)




//* models
const User = require("./models/User");
const Chat = require('./models/Chat');
const Group = require('./models/Group');
const Groupmember = require('./models/Groupmember');




//* routes
const userRoute = require("./routes/user");
const chatRoute = require('./routes/chat'); 
const groupRoute = require('./routes/group'); 




//* logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {flags: 'a'}
);




//* static paths
const publicPath = path.join(__dirname, "public");
const faviconPath = path.join(publicPath, "images", "Ico", "flashchat.ico");




//* socket.io connections
io.on('connection', (socket) => {
  
  socket.on('newMessage', (lastMessageId) => {
    io.emit('newMessage', lastMessageId);
  });

  socket.on('userActivity', async() => {
    io.emit('userActivity');
  });    

})




//* custom middleware for user authentication
const userAuthentication = require('./middlewares/auth');




//* express middlewares
app.use(express.static(publicPath));
app.use(morgan('combined', {stream: accessLogStream}));
app.use(express.json());




//* routes for static files
app.get(['/images/ico/favicon.ico', '/favicon.ico'], (req, res) => {
  fs.access(faviconPath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Favicon.ico file not found:", err);
      return res.status(404).end();
    }
    console.error("Favicon.ico File Found: ", faviconPath);
    res.sendFile(faviconPath);
  });
});

app.get("/", (req, res) => {
  res.sendFile("/views/portal.html", { root: publicPath });
});

app.get('/reset-password', (req, res) => {
  res.sendFile('/views/forgotpassword.html', { root: publicPath });
});

app.get('/dashboard', (req, res) => {
  res.sendFile('/views/dashboard.html', { root: publicPath });
});

app.get('/chat', (req, res) => {
  res.sendFile('/views/chat.html', { root: publicPath });
});




//* applied routes
app.use('/user', userRoute);
app.use(userAuthentication.isAuthenticated);
app.use('/chat', chatRoute);
app.use('/group', groupRoute);




//* DB relation & associations
User.hasMany(Chat);
Chat.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Chat.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });
Group.belongsToMany(User, {through: Groupmember});
User.belongsToMany(Group, {through: Groupmember});




//* setting port
const PORT = process.env.PORT_NO;




//* server execution started
function startServer() {
  sequelize
  //.sync({ force: true })
  .sync()
    .then(() => {
      console.log("Models synced with database");
      server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch(err => {
      console.error("Error syncing models with database:", err);
    });
}




//* invoke server execution
startServer();

