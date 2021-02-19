const Intern = require('../lib/Intern');

const intern = new Intern('Fran','000394','fran91@myCompany.com','UCLA')

test('creates an employee object with 3 properties (name, id, email, github)', () => {
  expect(intern).toEqual(expect.any(Object));
  expect(intern.name).toBe('Fran');
  expect(intern.id).toBe('000394');
  expect(intern.email).toBe('fran91@myCompany.com');
  expect(intern.school).toBe('UCLA');
});

test('getName() method to return the name property', ()=> {
  expect(intern.getName()).toBe('Fran');
});

test('getId() method to return the id property', ()=> {
  expect(intern.getId()).toBe('000394');
});

test('getEmail() method to return the email property', ()=> {
  expect(intern.getEmail()).toBe('fran91@myCompany.com');
});

test('getRole() method to return the constructor name (which is named after role)', ()=> {
  expect(intern.getRole()).toBe('Intern');
});

test('getSchool() method to return the school property of the object', ()=> {
  expect(intern.getSchool()).toBe('UCLA');
  expect(intern.getSchool()).toBe(intern.school);
});
