import { restClient } from 'ra-data-feathers';
import { authClient } from 'ra-data-feathers';
// import restClient from './dataProvider/restClient';
// import authClient from './dataProvider/authClient';
import feathersClient from './feathersClient';
import decodeJwt from 'jwt-decode';

const authClientOptions = {
  storageKey: 'feathers-jwt',
  authenticate: { strategy: 'local' },
  usernameField: 'email',
  passwordField: 'password',
  permissionsField: 'role'
};

const options      = { id: '_id', usePatch: true };
const DataProvider = restClient(feathersClient, options);
const AuthClient   = authClient(feathersClient, authClientOptions);

const getJwtData = () => {
  const jwtToken = localStorage.getItem(authClientOptions.storageKey);
  return decodeJwt(jwtToken);
};

const clearJwtData = () => {
  localStorage.clear()
}

export {
  DataProvider,
  AuthClient,
  getJwtData,
  clearJwtData
}
