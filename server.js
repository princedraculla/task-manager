const express = require("express");
const connection = require("./database/config");
require("dotenv").config();
const router = require("./routes/routes");
const authRoutse = require('./routes/authRoutes')

const app = express();

app.use(express.static('public'))
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use(router);
app.set('view engine', 'ejs')

app.listen(PORT, () => {
  console.log(`server is started at localhost:${PORT}`);
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("database is connected");
});
app.get('/', (req,res) => res.render('home'))
app.use(authRoutse)