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





/**                 USING HTTPS STRANGE ERRORS ARE DETECTED */

// const https = require('https');
// const fs = require('fs');
// const express = require('express');
// const app = express();
// // Set up express server here
// const options = {
//     cert: fs.readFileSync('cert.pem'),
//     key: fs.readFileSync('key.pem'),
//     passphrase: '1234'    //It is needed if we add a passphrase
// };
// // app.listen(8080);

// // To tell express what should be the routefile for the files
// app.use(express.static(('dist')));

// app.get('/restaurants?id=',function(req,res){
//   res.sendFile('restaurant.html',{ root: __dirname + '/dist/' });
//   //It will find and locate index.html from View or Scripts
// });

// app.get('/',function(req,res){
//   res.sendFile('index.html');
//   //It will find and locate index.html from View or Scripts
// });

// // app.listen(3000);

// https.createServer(options, app).listen(3000);
