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
         addDepartment()
        }
        else if(answer.options === "Add role") {
          //bidAuction();
          console.log("Add role")
          addRole()
        } 
        else if(answer.options === "Add employee") {
            //bidAuction();
            console.log("Add employee")
            addEmployee()
          }
          else if(answer.options === "View departments") {
           // bidAuction();
           console.log("View departments")
            viewDepartment()
          }
          else if(answer.options === "View roles") {
           // bidAuction();
           console.log("View roles")
           viewRoles()
          }
          else if(answer.options === "View employees") {
           // bidAuction();
           console.log("View employees")
           viewEmployees()
          }
          else if(answer.options === "Update employee roles") {
           // bidAuction();
           console.log("Update employee roles")
           updateRole()
          }
        else{
          connection.end();
          console.log("exit")
        }
      });


  } 

  //functions for view

  function viewDepartment() {
    connection.query("SELECT * FROM department", function(err, results) {
        if (err) throw err;
        console.table(results)
  
    })
  }

  function viewRoles() {
    connection.query("SELECT * FROM role", function(err, results) {
        if (err) throw err;
        console.table(results)
    })
  }

  function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
        console.table(results)
    })
  }

  //add function update!!

  function update() {

    
  }




  function addDepartment() {
    console.log("department")
    inquirer
      .prompt({
        name: "departmentName",
        message: "What department do you want to add?",
      }).then(function(answer) {
        connection.query("INSERT INTO department SET ?",{
        name: answer.departmentName
        },
    
        function(err, results) {
        if (err) throw err;
        console.log("created dep");
        start();
     })

      })
  }

 

  function addRole() {
 
    connection.query("SELECT * FROM department", function(err, results) {
      if (err) throw err;
      //console.log(results)
      let department = results.map(item => ({
        name: item.name,
        value: item.id
      }))

      inquirer
      .prompt([

        {
          name: "title",
          type: "input",
          message: "What role do you want to add?"
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary?"
        },
        {
          name: "department_id",
          type: "list",
          choices: department
          
        },
      ]).then(function(answer) {
        connection.query("INSERT INTO role SET ?",{
        title: answer.title,
        salary: answer.salary,
        department_id: answer.department_id

        },
    
        function(err, results) {
        if (err) throw err;
        console.log("created dep");
        start();
     })

      })




  })

    
  }

  function addEmployee() {
    connection.query("SELECT * FROM role", function(err, results) {
      if (err) throw err;
      console.log(results)
      let role = results.map(item => ({

        name: item.title,
        value: item.id
      }))
      
      connection.query("SELECT * FROM employee", function(err, results) {
        if (err) throw err;
        console.log(results)
        let manager = results.map(item => ({
  
          name: `${item.first_name} ${item.last_name}`,
          value: item.id
        }))




    
    inquirer
      .prompt([
        {
          name: "firstName",
          message: "What's your first name?",
        },

        {
          name: "lastName",
          message: "What's your last name?",
        },

        {
          name: "role_id",
          type: "list",
          choices: role,
        },

        {
          name: "manager_id",
          type: "list",
          choices: manager
        },
        
      ]).then(function(answer) {
        connection.query("INSERT INTO employee SET ?",{
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.role_id,
        manager_id: answer.manager_id
        
        },

        function(err, results) {
        if (err) throw err;
        console.log("created dep");
        start();
     })

      })
    })
  })
  }