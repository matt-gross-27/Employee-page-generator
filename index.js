const inquirer = require('inquirer');
const Employee = require('./lib/Employee');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const writeFile = require('./utils/file-system');
const generatePage = require('./src/page-template');

const promptManager = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: "Enter your team manager's name. (Required)",
      validate: input => {
        if(input) {
          return true;
        } else {
          console.log("Please enter your team manager's name.");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter the team manager's employee Id. (Required)",
      validate: input => {
        if(input) {
          return true;
        } else {
          console.log("Please enter your team manager's employee Id.");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter the team manager's email. (Required)",
      validate: input => {
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/    
        if(emailRegex.test(input)) {
          return true;
        } else {
          console.log("Please enter a valid email.");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'officeNumber',
      message: "Enter the team manager's office number (Required)",
      validate: input => {
        if(input) {
          return true;
        } else {
          console.log("Please enter your team manager's Office Number.");
          return false;
        }
      }
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
      message: "Enter your team member's name. (Required)",
      validate: input => {
        if(input) {
          return true;
        } else {
          console.log("Please enter your team member's name.");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'id',
      message: "Enter your team member's Id",
      validate: input => {
        if(input) {
          return true;
        } else {
          console.log("Please enter your team member's id.");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'email',
      message: "Enter your team member's email",
      validate: input => {
        if(input) {
          return true;
        } else {
          console.log("Please enter your team member's email.");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: "Enter your Engineer's github username",
      validate: input => {
        const githubRegex =  new RegExp(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i)
        if(githubRegex.test(input)) {
          return true;
        } else {
          console.log("Please enter a valid github username.");
          return false;
        }
      },
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
      message: "Enter your Intern's school",
      validate: input => {
        if(input) {
          return true;
        } else {
          console.log("Please enter your intern's school.");
          return false;
        }
      },
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
    promptTeam(manager).then(myTeamArr => {
      return generatePage(myTeamArr)
    })
    .then(pageHTML => {
      return writeFile(pageHTML);
    })
    .then(response => {
      console.log(`
      ========================================
      ${response.message}
      ========================================`);
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));