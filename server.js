const express = require('express');
const app  = express();
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useMongoClient:true});
var db = mongoose.connection;
db.once('open', ()=>console.log('Connected to DB'));

// Create the schema
var userSchema = mongoose.Schema({name:String, });
// Create a model based on the schema ( like a class)
var User = mongoose.model('User', userSchema);
// create an instance of the model (document)
var newUser = new User({name:'nefgrixis'});
newUser.save((err, users)=>{
  console.log(users);
});


app.post('/newMsg', (req,res)=>{
  console.log(req.data);
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