const users = require('./users/users.service.js');
const roles = require('./roles/roles.service.js');
const uploads = require('./uploads/uploads.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(roles);
  app.configure(uploads);
};
