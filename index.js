const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

const promptManager = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter the team manager's name"
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter the team manager's Id"
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter the team manager's email"
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "Enter the team manager's office number",
    }
  ])
};

const promptTeam = (manager, employees) => {
  if(!employees) {
    employees = []
    employees.push(manager);
  }
  return inquirer.prompt([
    {
      type: 'list',
      name: 'role',
      message: 'Which type of team member would you like to add?',
      choices: ['Engineer', 'Intern']
    },
    {
      type: 'input',
      name: 'name',
      message: "Enter the team member's name"
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter the team member's Id"
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter the team member's email"
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
    if (role === 'Engineer'){
      employees.push(new Engineer(name, id, email, theRest.github))
    }
    if (role === 'Intern'){
      employees.push(new Intern(name, id, email, theRest.school))
    }
    if(employeeData.confirmAddEmployee) {
      return promptTeam(manager, employees);
    } else {
    return employees
    }
  });
};

promptManager()
  .then(data => {
    const { name, id, email, officeNumber } = data;
    const manager = new Manager(name, id, email, officeNumber);
    promptTeam(manager).then(myTeamArr => console.log(myTeamArr))
  })