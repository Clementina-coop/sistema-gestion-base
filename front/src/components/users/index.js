import React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  SimpleForm,
  Edit,
  TextInput,
  SelectInput,
  Create,
  ReferenceField,
  ReferenceInput
} from 'react-admin';

export const UserList = props => (
  <List title="Usuarios" {...props}>
    <Datagrid rowClick="edit">
      <TextField label="Nombre" source="name" />
      <EmailField label="Email" source="email" />
      <ReferenceField label="Rol" source="role" reference="roles" link={false}>
        <TextField source="name"/>
      </ReferenceField>
    </Datagrid>
  </List>
);

export const UserEdit = props => (
  <Edit title="Editar usuario" {...props}>
    <SimpleForm>
      <TextInput label="Nombre" source="name" type="text"/>
      <TextInput label="Email" source="email" type="email"/>
      <ReferenceInput label="Rol" source="role" reference="roles">
        <SelectInput optionText="name" optionValue="_id"/>
      </ReferenceInput>
      <TextInput label="Password" source="password" type="password"/>
    </SimpleForm>
  </Edit>
);

export const UserCreate = props => (
  <Create title="Crear usuario" {...props}>
    <SimpleForm>
      <TextInput label="Nombre" source="name" type="text"/>
      <TextInput label="Email" source="email" type="email"/>
      <ReferenceInput label="Rol" source="role" reference="roles">
        <SelectInput optionText="name" optionValue="_id"/>
      </ReferenceInput>
      <TextInput label="Password" source="password" type="password"/>
    </SimpleForm>
  </Create>
);
