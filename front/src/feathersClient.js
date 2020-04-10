const feathers = require('@feathersjs/feathers');
const auth = require('@feathersjs/authentication-client');
const restClient = require('@feathersjs/rest-client');
const host = process.env.REACT_APP_API_URL || 'http://localhost:3030';

const restCli = restClient(host);

const authOptions = {
  jwtStrategy: 'jwt',
  storage: window.localStorage,
  storageKey: 'feathers-jwt',
  authenticate: { strategy: 'local' },
  usernameField: 'email',
  passwordField: 'password',
  permissionsField: 'role'
};

const client = feathers()

export default client.configure(restCli.fetch(window.fetch))
                      .configure(auth(authOptions));
