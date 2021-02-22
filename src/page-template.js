const mapEngineers = engineerArr => {
  return engineerArr.map( ({ name, id, email, github }) => {
    return `
        <div class="card mt-3 flex-grow-1 mx-2">
          <h5 class="card-header">Engineer</h5>
          <div class="card-body px-3">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Employee ID: ${id}</p>
            <p class="card-text"><a href="mailto:${email}">Email: ${email}</a></p>
            <p class="card-text"><a href="https://github.com/${github}" target="_blank">Github: ${github}</a></p>
          </div>
        </div>
        `
  }).join('');
};

const mapInterns = internArr => {
  return internArr.map( ({ name, id, email, school }) => {
    return `
        <div class="card mt-3 flex-grow-1 mx-2">
          <h5 class="card-header">Intern</h5>
          <div class="card-body px-3">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Employee ID: ${id}</p>
            <p class="card-text"><a href="mailto:${email}">Email: ${email}</a></p>
            <p class="card-text">School: ${school}</p>
          </div>
        </div>
        `
  }).join('');
};


generatePage = pageData => {
  // filter data by Employee type (constructor.name)
  const result = pageData.filter(Obj => Obj.constructor.name === 'Manager');
  manager = result[0];

  const engineers = pageData.filter(Obj => Obj.constructor.name === 'Engineer');
  
  const interns = pageData.filter(Obj => Obj.constructor.name === 'Intern');

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
    <title>My Team</title>
  </head>
  <body class="text-dark">
    <header class="d-flex justify-content-center py-3 mb-3 bg-info">
      <h1 class="text-warning">My Team</h1>
    </header>
    
    <main class= "container">
      <div class="border border-dark rounded-top">
        <h4 class="card-header border-dark">Manager</h4>
        <div class="card-body">
          <h5 class="card-title">${manager.name}</h5>
          <p class="card-text">Employee ID: ${manager.id}</p>
          <p class="card-text"><a href="mailto:${manager.email}">Email: ${manager.email}</a></p>
          <p class="card-text">Office Number: ${manager.officeNumber}</p>
        </div>
      </div>
      
      <h4 class="border-left border-right border-dark card-header w-100">Manager's Team</h4>
      
      <section class="border-bottom border-left border-right rounded-bottom border-dark d-flex flex-wrap flex-column flex-md-row justify-content-between px-2 pb-3 mb-5">
        ${mapEngineers(engineers)}
        ${mapInterns(interns)}
      </section>
    </main>
  </body>
  </html>
  `
  }

  module.exports = generatePage;