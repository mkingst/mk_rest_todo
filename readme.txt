This is a simple HTTP RESTful TODO appliction that allows you to create, view, update and delete tasks from a database. 

●	Performs CRUD operations on tasks in a MySQL Database
●	Has endpoints with functions to view, get, update and delete tasks.
●	Has error handling for tasks not being found and invalid requests. 
●	Runs on a HTTP server using express.js (Node.js module)
●	Created using node.js (plus express, mysql and body-parser modules).

Notes:

1. To run, ensure node.js is installed. Navigate to the repository and run "node application.js". It should start the http server on port 5000.

2.	
The mySQL server was not set up locally on my machine. I used a hosted SQL server on freemysqlhosting.net, 
so you can view the tasks that are already in the database when testing this. The code below shows the database 
connection that you can access yourself using any mySQL client (I used HeidiSQL). 
(See /lib/database.js for all of the database connection code)

var connection = mysql.createConnection({
  host     : 'sql2.freemysqlhosting.net',
  user     : 'sql2262856',
  password : 'yH1!qM6!',
  database : 'sql2262856'
});

3.	
●	The main application code is in "application.js"
●	All functions / endpoints that are called are in "/task/taskController.js" 
●	Database connection is in "/lib/database.js"
●	All required modules for node.js are in "node_modules", particularly (express, body-parser and mysql)


