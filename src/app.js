require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
var session = require('express-session');
const cookieParser = require('cookie-parser');



app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());


const login_router = require("./pages/login");


app.use("/", login_router);

  
app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });