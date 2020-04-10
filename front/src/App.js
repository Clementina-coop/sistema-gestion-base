import React from 'react';
import { Admin, Resource } from 'react-admin';
import { DataProvider, AuthClient } from "./providers";
import { UserList, UserEdit, UserCreate } from './components/users';
import { UploadList, UploadEdit, UploadCreate } from './components/uploads';
import Login from './components/MyLoginPage';
import PeopleIcon from '@material-ui/icons/People';
import ImageIcon from '@material-ui/icons/Image';
import { Dashboard } from './components/Dashboard';
import { spanishI18nProvider } from "./i18nProviders/spanish";

const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={DataProvider}
    authProvider={AuthClient}
    loginPage={Login}
    i18nProvider={spanishI18nProvider}
  >
    <Resource
      name="users"
      list={UserList}
      edit={UserEdit}
      create={UserCreate}
      icon={PeopleIcon}
      options={{label: "Usuarios"}}
    />
    <Resource
      name="uploads"
      list={UploadList}
      edit={UploadEdit}
      create={UploadCreate}
      icon={ImageIcon}
      options={{label: "Imágenes"}}
    />
    <Resource
      name="roles"
    />
  </Admin>
);

export default App;
