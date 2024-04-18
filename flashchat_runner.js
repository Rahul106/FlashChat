const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const publicPath = path.join(__dirname, "public");

app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.sendFile("portal.html", { root: "views" });
});

app.get('/reset-password', (req, res) => {
  res.sendFile('forgotpassword.html', {root:'views'});
});


//const PORT = process.env.PORT || 4000;
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
