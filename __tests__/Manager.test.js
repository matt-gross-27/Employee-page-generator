const Manager = require('../lib/Manager');

const manager = new Manager('Fran','000394','fran91@myCompany.com','3-14')

test('creates a manager object with 4 properties (name, id, email, officeNumber)', () => {
  expect(manager).toEqual(expect.any(Object));
  expect(manager.name).toBe('Fran');
  expect(manager.id).toBe('000394');
  expect(manager.email).toBe('fran91@myCompany.com');
  expect(manager.officeNumber).toBe('3-14');
});

test('getName() method to return the name property', ()=> {
  expect(manager.getName()).toBe('Fran');
});

test('getId() method to return the id property', ()=> {
  expect(manager.getId()).toBe('000394');
});

test('getEmail() method to return the email property', ()=> {
  expect(manager.getEmail()).toBe('fran91@myCompany.com');
});

test('getRole() method to return the constructor name (which is named after role)', ()=> {
  expect(manager.getRole()).toBe('Manager');
});