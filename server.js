const express = require("express");
const connection = require("./database/config");
require("dotenv").config();
const router = require("./routes/routes");
const authRoutse = require("./routes/authRoutes");
const bodyparser = require("body-parser");
const path = require('path')


const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set('views', path.join(__dirname))
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(router);
app.set("view engine", "ejs");

app.listen(PORT, () => {
  console.log(`server is started at localhost:${PORT}`);
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("database is connected");
});
app.use(authRoutse);
