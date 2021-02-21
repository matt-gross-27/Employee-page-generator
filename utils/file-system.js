const fs = require('fs');

const writeFile = htmlContent => {
  return new Promise((resolve, reject) => {
    fs.writeFile('./dist/index.html', htmlContent, err => {
      // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
      if(err) {
        reject(err);
        // return out of the function so that the promise does not execute the resolve() function
        return;
      }
      // if everything went well, resolve the Promise and send the successful data to the `.then()` method
      resolve({
        ok: true,
        message: "Page created => view './dist/index.html'"
      });
    });
  });
};

module.exports = writeFile