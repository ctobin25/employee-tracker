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
   // start();
  });
