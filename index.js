const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const promptUser = (employees) => {
  if(!employees) {
    employees =[];
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
    }
  ])
}

promptUser()
  .then(({ role, name, id, email, ...theRest }) => {
    if (role === 'Employee'){
      console.log(new Employee(name, id, email))
    }
    if (role === 'Manager'){
      console.log(new Manager(name, id, email, theRest.officeNumber))
    }
    if (role === 'Engineer'){
      console.log(new Engineer(name, id, email, theRest.github))
    }
    if (role === 'Intern'){
      console.log(new Intern(name, id, email, theRest.school))
    }
  });