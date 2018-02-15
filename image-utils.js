const Promise = require('bluebird');
const exec = require('child_process').exec;

/**
* Convert a specific url (page) to image
**/
const htmlToImage = (url, filePath) =>
  new Promise((resolve, reject) => {
    exec(`wkhtmltoimage --debug-javascript --javascript-delay 1000 ${url} ${filePath}`,
      (error, stdout, stderr) => {
        console.error(`stderr:  ${stderr}`); // eslint-disable-line no-console
        if (error !== null) {
          reject(error);
          return;
        }
        resolve(filePath);
        return;
      });
  });

module.exports.htmlToImage = htmlToImage;
