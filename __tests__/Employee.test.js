const Employee = require('../lib/Employee');

const employee = new Employee('Fran','000394','fran91@myCompany.com')

test('creates an employee object with 3 properties (name, id, email)', () => {
  expect(employee).toEqual(expect.any(Object));
  expect(employee.name).toBe('Fran');
  expect(employee.id).toBe('000394');
  expect(employee.email).toBe('fran91@myCompany.com');
});

test('getName() method to return the name property', ()=> {
  expect(employee.getName()).toBe('Fran');
});

test('getId() method to return the id property', ()=> {
  expect(employee.getId()).toBe('000394');
});

test('getEmail() method to return the email property', ()=> {
  expect(employee.getEmail()).toBe('fran91@myCompany.com');
});

test('getRole() method to return the constructor name (which is named after role)', ()=> {
  expect(employee.getRole()).toBe('Employee');
});