INSERT INTO department (name)
    VALUES ("engineer"), ("hr"), ("programmer");
    
    INSERT INTO role (title, salary, department_id)
    VALUES ("front end engineer", 60000, 1);
    
    INSERT INTO employee (first_name, last_name, role_id,manager_id)
    VALUES ("John", "Smith", 1, null);