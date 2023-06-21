const express = require("express");
const connection = require("./database/config");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("database is connected");
});

app.listen(PORT, () => {
  console.log(`server is started at localhost:${PORT}`);
});
