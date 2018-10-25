//create a mysql connection (taken from https://github.com/mysqljs/mysql)

var mysql      = require('mysql');

//we are using an online hosted mysql database (www.myfreesqlhosting.net)
var connection = mysql.createConnection({
  host     : 'sql2.freemysqlhosting.net',
  user     : 'sql2262856',
  password : 'yH1!qM6!',
  database : 'sql2262856'
});

connection.connect();

//allow the connection to be used my other files in the code
module.exports = {
connection : connection
}