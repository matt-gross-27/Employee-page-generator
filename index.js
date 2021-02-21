const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const promptUser = (employees) => {
  if(!employees) {
    employees = [];
  }

  return inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Which type of Employee would you like to add?',
      choices: ['Employee', 'Manager', 'Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'name',
      message: "Enter the employee's name"
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter the employee's Id"
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter the employee's email"
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "Enter the Manager's office number",
      when: ({ role }) => {
        if(role === 'Manager') {
          return true;
        }
        return false;
      }
    },
    {
      type: 'input',
      name: 'github',
      message: "Enter the Engineer's github username",
      when: ({ role }) => {
        if(role === 'Engineer') {
          return true;
        }
        return false;
      }
    },
    {
      type: 'input',
      name: 'school',
      message: "Enter the Intern's school",
      when: ({ role }) => {
        if(role === 'Intern') {
          return true;
        }
        return false;
      }
    },
    {
      type: 'confirm',
      name: 'confirmAddEmployee',
      message: 'Would you like to add another employee?',
      default: false
    }
  ]).then(employeeData => {
    const { role, name, id, email, ...theRest } = employeeData;
    if (role === 'Employee'){
      employees.push(new Employee(name, id, email))
    }
    if (role === 'Manager'){
      employees.push(new Manager(name, id, email, theRest.officeNumber))
    }
    if (role === 'Engineer'){
      employees.push(new Engineer(name, id, email, theRest.github))
    }
    if (role === 'Intern'){
      employees.push(new Intern(name, id, email, theRest.school))
    }
    if(employeeData.confirmAddEmployee) {
      return promptUser(employees);
    } else {
    return employees
    }
  });
};

promptUser()
  .then(employees => {
    console.log(employees);
  })