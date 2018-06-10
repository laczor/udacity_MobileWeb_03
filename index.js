var express = require("express");
var app     = express();
// var path = require('path');

// To tell express what should be the routefile for the files
app.use(express.static(('dist')));

app.get('/restaurants?id=',function(req,res){
  res.sendFile('restaurant.html',{ root: __dirname + '/dist/' });
  //It will find and locate index.html from View or Scripts
});

app.get('/',function(req,res){
  res.sendFile('index.html');
  //It will find and locate index.html from View or Scripts
});

app.listen(3000);

console.log("Running at Port 3000");