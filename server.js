var mysql = require("mysql");
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
  
    
    port: 3306,
  
   
    user: "root",
  
    
    password: "unicorn1",
    database: "job"
  });
  

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connect")
    // run the start function after the connection is made to prompt the user
    start();
  });


  function start() {
    inquirer
      .prompt({
        name: "options",
        type: "list",
        message: "Select what you would like to do?",
      choices: [
        "Add department", 
        "Add role", 
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
        "Exit"
      
      ]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.options === "Add department") {
         // postAuction();
         console.log("add department")
        }
        else if(answer.options === "Add role") {
          //bidAuction();
          console.log("Add role")
        } 
        else if(answer.options === "Add employee") {
            //bidAuction();
            console.log("Add employee")
          }
          else if(answer.options === "View departments") {
           // bidAuction();
           console.log("View departments")
            viewDepartment()
          }
          else if(answer.options === "View roles") {
           // bidAuction();
           console.log("View roles")
          }
          else if(answer.options === "View employees") {
           // bidAuction();
           console.log("View employees")
          }
          else if(answer.options === "Update employee roles") {
           // bidAuction();
           console.log("Update employee roles")
          }
        else{
          connection.end();
          console.log("exit")
        }
      });


  } 

  function viewDepartment() {
    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err;
        console.table(results)
    })
  }
