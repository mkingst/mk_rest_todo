//The following takes a json task sent from Postman and creates it in the database

//require database connection
var connection = require('../lib/database.js').connection;

module.exports = {

    //function to create task
    createTask: function (req, res) {

        //access the data in the reqest body
        var requestData = req.body;

        //if task message is not available, then return an error (test this by misspelling te request in Postman)
        if (!requestData.taskMessage) {
            return res.status(400).json({ code: "taskCreationgFailed", message: "task message not available" });
        }

        //populate a mysql table if a task is received
        var taskData = {
            taskMessage: requestData.taskMessage,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        connection.query('INSERT INTO task SET ?', taskData, function (err, result, fields) {

            //if an error occurs inserting to the database, show an error
            if (err) {
                console.log(err);
                return res.status(500).json({ code: "taskCreationFailed", message: "Error occured while creating record" });
            }

            //otherwise, send a message showing that is was successful
            return res.status(200).json({ code: "taskCreated", message: "Task creation successfull" });

        });

    },

    //Function to get tasks
    getTask: function (req, res) {

        connection.query('SELECT * from task', function (err, results, fields) {

            if (err) {
                console.log(err);
                return res.statut(500).json({ code: "taskNotFound", message: "Error occured when getting tasks from database" })
            }

            return res.status(200).json({ code: "taskFound", data: results });

        });

    },

    //Function to get task by ID


    getTaskById: function (req, res) {

        //accessing the task ID to find
        var taskId = req.params.taskId;

        connection.query('SELECT * FROM task where id=?', [taskId], function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({ code: "taskNotFound", message: "Error occured when finding task by ID" });
            }

            //if number of results was 0
            if (results.length === 0) {

                return res.status(404).json({ code: "taskNotFound", message: "Task with this ID not found" });
            }

            return res.status(200).json({ code: "taskFound", data: results });

        });
    },

    updateTaskById: function (req, res) {

        //accessing the task ID
        var taskId = req.params.taskId;

        //request data to update
        var requestData = req.body;

        //if there is an empty PUT request
        if (!requestData.taskMessage) {
            return res.status(400).json({ code: "taskUpdateFailed", message: "Task message not available in the body" })
        }


        //Any issies accessing the database?
        connection.query('SELECT * FROM task where id=?', [taskId], function (err, results, fields) {
            if (err) {
                console.log(err);
                return res.status(500).json({ code: "taskUpdateFailed", message: "Error occured when accessing database" });
            }

            //if number of results was 0 / task isn't there
            if (results.length === 0) {

                return res.status(500).json({ code: "taskUpdateFailed", message: "No record with this ID exists" });
            }


            //otherwise, update the table with the new values. 
            connection.query('UPDATE task SET taskMessage=?,updatedAt=? where id=?', [requestData.taskMessage, new Date(), taskId], function (err, results, fields) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ code: "taskUpdateFailed", message: "Error occured when accessing database while updating the task" });
                }
                res.status(200).json({ code: "taskUpdated" });

            });
        });

    }

};