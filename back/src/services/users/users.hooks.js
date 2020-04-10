const { authenticate } = require("@feathersjs/authentication").hooks;
const { protect, hashPassword } = require("@feathersjs/authentication-local").hooks;
const { likeRegex } = require("../utils/misc.utils.js");

module.exports = {
  before: {
    all: [authenticate("jwt")],
    find: [
      likeRegex
    ],
    get: [],
    create: [
      hashPassword("password")
    ],
    update: [
      hashPassword("password")
    ],
    patch: [
      hashPassword("password")
    ]
  },

  after: {
    all: [
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect("password")
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
