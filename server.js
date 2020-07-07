const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const app = express();
const cors = require('cors');
const knex = require('knex');

const register = require('./Controller/register.js');
const signin = require('./Controller/signin.js');
const profile = require('./Controller/profile.js');
const image = require('./Controller/image.js');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'webdev',
    database : 'smart-brain'
  }
});


app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
  // res.send('this is working');
  res.send(database.users);
});


// SIGN IN
app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)});

// Register
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)});

//Profile
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req,res,db)});
// Image
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
// Image API
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})





app.listen(3001, ()=>{
  console.log('app is running on port 3001')
});


/* Project requirements
/ ---> res = this is working
/signin ---> POST = success/fail
/register --> POST = user
/ profile/:userID ---> GET = user
/imgae ---> PUT ---> user
*/
