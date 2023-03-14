const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex')
const register = require('./controllers/Register')
const signin = require('./controllers/Signin')
const profile = require('./controllers/Profile')
const image = require('./controllers/Image')

const db =  knex({
  client: 'pg',
  connection:{
    connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
    }
});

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("😋 VisionX Backend made by Faran Taimoor Butt");
});

//My signin EndPoint
app.post("/signin", (req,res) => {(signin.handleSignin(req,res,db,bcrypt))});

//My Register EndPoint
app.post("/register", (req,res) => {register.handleRegister(req,res,db,bcrypt)});

//My Profile EndPoint
app.get("/profile/:id",(req,res) => {profile.profileHandler(req,res,db)});

//My Profile EndPoint
app.put("/image", (req,res) => {image.ImageHandler(req,res,db)});

app.post("/imageUrl", (req,res) => {image.ApiCallHandler(req,res)});

app.listen(process.env.PORT || 3001, () => {
  console.log("App is started!");
});

