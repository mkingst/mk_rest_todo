//Require the express module for a http server. Node.js will load this module from the node_modules folder to create a http server

var express = require('express');

//include a database connection (database.js)
var connection = require('./app/lib/database.js').connection;

var SERVER_PORT = 5000;

//create express http app instance 

var app = express();

//instanciate my express server on port 5000

app.listen(5000,function(){
    console.log("Server successfully started on port:" + SERVER_PORT);
});

