const express = require('express');
const app  = express();
const port = 3000;
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useMongoClient:true});
const db = mongoose.connection;
db.once('open', ()=>console.log('Connected to DB'));

// Create the schema
const userSchema = mongoose.Schema({
  userName:String,
});

// Create a model based on the schema ( like a class)
let User = mongoose.model('Profile', userSchema);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.disable('x-powered-by');

app.post('/newUser', (req,res)=>{
  let user = {userName:req.body.user};
  
  // create an instance of the model (document)
  let userDoc = new User(user);
  userDoc.save((err, users)=>{
    console.log(users);
    res.sendStatus(200);
  });
});

app.get('/test', (req, res) =>{
  res.send('Testing works');
});

app.listen(port, '0.0.0.0', (err)=>{
   if(err){
      return console.log('something happened', err);
   }

   console.log('Listening to port ' + port);
});