const { authenticate } = require('@feathersjs/authentication').hooks;
const { BadRequest } = require('@feathersjs/errors');
const fs = require('fs');
const { likeRegex } = require("../utils/misc.utils.js");

module.exports = {
  before: {
    all: [ authenticate('jwt')
    ],
    find: [
      likeRegex
    ],
    get: [],
    create: [
      context => {
        if (context.params.file) {
          let host = process.env.VIRTUAL_HOST ?
                      process.env.VIRTUAL_HOST :
                      context.app.get('host') + ':' + context.app.get('port');
          let path = '//' + host + context.params.file.path.replace('public', '')
          let img = {
            name: context.params.file.originalname,
            path: path,
            description: context.data.description,
            mimetype: context.params.file.mimetype,
            user: context.params.user._id
          };
          context.data = [ img ];
        } else {
          throw new BadRequest(
            'Validation error',
            { errors: ['path `file` is required'] }
          );
        }
        return context;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      context => {
        if (context.params.file) {
          let path = context.params.file.path;
          fs.unlinkSync(path);
        }
        return context;
      }
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
