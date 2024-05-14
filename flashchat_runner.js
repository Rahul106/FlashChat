const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
//const bodyParser = require("body-parser");
const sequelize = require("./utils/database");



//models
const User = require("./models/User");
const Chat = require('./models/Chat');
const Group = require('./models/Group');
const Groupmember = require('./models/Groupmember');



//importing routes
const userRoute = require("./routes/user");
const chatRoute = require('./routes/chat'); 
const groupRoute = require('./routes/group'); 
const messages = require('./routes/socket_Io')



//middleware for user authentication
const userAuthentication = require('./middlewares/auth');



const publicPath = path.join(__dirname, "public");
const faviconPath = path.join(publicPath, "images", "Ico", "flashchat.ico");





//middlewares
app.use(express.static(publicPath));
app.use(express.json());




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

app.get('/logout', (req, res) => {
  res.sendFile('/views/portal.html', { root: publicPath });
});





app.use('/user', userRoute);
app.use(userAuthentication.isAuthenticated);
app.use('/chat', chatRoute);
app.use('/group', groupRoute);





//DB Associations
User.hasMany(Chat);
Chat.belongsTo(User, { foreignKey: 'senderId', as: 'sender' });
Chat.belongsTo(User, { foreignKey: 'receiverId', as: 'receiver' });

Group.belongsToMany(User, {through: Groupmember});
User.belongsToMany(Group, {through: Groupmember});




const PORT = process.env.PORT_NO;

function startServer() {
  sequelize
    .sync()
    .then(() => {
      console.log("Models synced with database");
    })
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }).catch((err) => {
      console.error("Error syncing models with database:", err);
    });
}

startServer();

