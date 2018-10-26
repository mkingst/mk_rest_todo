//Require the express module for a http server. Node.js will load this module from the node_modules folder to create a http server
var express = require('express');

//require the body parser module for json and encoded URL's. This will parse the data from the request
var bodyParser = require('body-parser');

//require the task controller which has the function of creating a task
var taskController = require('./app/task/taskController');

//include a database connection (database.js)
var connection = require('./app/lib/database.js').connection;

var SERVER_PORT = 5000;

//create express http app instance 

var app = express();

//apply middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

//endpoints (all of these call the functions in taskController.js)

//create task
app.post('/api/v1.0/task', taskController.createTask);

//get all tasks
app.get('/api/v1.0/task', taskController.getTask);

//get task by ID 
app.get('/api/v1.0/task/id/:taskId', taskController.getTaskById);

//Update task by ID 
app.put('/api/v1.0/task/id/:taskId', taskController.updateTaskById);

//Delete task by ID 
app.delete('/api/v1.0/task/id/:taskId', taskController.deleteTaskById);

//instanciate my express server on port 5000

app.listen(5000, function () {
    console.log("Server successfully started on port:" + SERVER_PORT);
});

