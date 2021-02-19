const Engineer = require('../lib/Engineer');

const engineer = new Engineer('Fran','000394','fran91@myCompany.com','python-fran-lib')

test('creates an employee object with 3 properties (name, id, email, github)', () => {
  expect(engineer).toEqual(expect.any(Object));
  expect(engineer.name).toBe('Fran');
  expect(engineer.id).toBe('000394');
  expect(engineer.email).toBe('fran91@myCompany.com');
  expect(engineer.github).toBe('python-fran-lib');
});

test('getName() method to return the name property', ()=> {
  expect(engineer.getName()).toBe('Fran');
});

test('getId() method to return the id property', ()=> {
  expect(engineer.getId()).toBe('000394');
});

test('getEmail() method to return the email property', ()=> {
  expect(engineer.getEmail()).toBe('fran91@myCompany.com');
});

test('getRole() method to return the constructor name (which is named after role)', ()=> {
  expect(engineer.getRole()).toBe('Engineer');
});

test('getGithub() method to return the github property of the object', ()=> {
  expect(engineer.getGithub()).toBe(engineer.github);
  expect(engineer.getGithub()).toBe('python-fran-lib');
});