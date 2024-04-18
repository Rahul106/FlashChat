const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");




const publicPath = path.join(__dirname, "public");




app.use(express.static(publicPath));




//importing routes
const userRoute = require("./routes/user");




//middlewares
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(express.static(publicPath));




app.get("/", (req, res) => {
  res.sendFile("portal.html", { root: "views" });
});

app.get('/reset-password', (req, res) => {
  res.sendFile('forgotpassword.html', {root:'views'});
});





app.use('/user', userRoute);




//const PORT = process.env.PORT || 4000;
const PORT = process.env.PORT || 3000;
sequelize
  //.sync({ force: true })
  .sync()
  .then(() => {
    console.log("models synced with database");
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    })
  )
  .catch((err) => {
    console.error("error syncing models with database:", err);
  });
