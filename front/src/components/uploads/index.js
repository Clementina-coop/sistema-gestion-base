import React from 'react';
import {
  List,
  SimpleForm,
  Edit,
  TextInput,
  Create,
  ImageField,
  ImageInput,
  Filter,
  Pagination,
  required
} from 'react-admin';
import Toolbar from './toolbar.js';
import Gallery from "./gallery.js";

const UploadsFilter = props => (
  <Filter {...props}>
    <TextInput label="Descripción" source="searchdescription" />
  </Filter>
);

const UploadsPagination = props => (
  <Pagination rowsPerPageOptions={[12, 24, 48]} {...props} />
);

export const UploadList = props => (
  <List
    {...props}
    title="Fotos"
    perPage={12}
    filters={<UploadsFilter />}
    pagination={<UploadsPagination />}
    exporter={false}
  >
    <Gallery />
  </List>
);

export const UploadEdit = props => (
    <Edit title="Editar imagen" {...props}>
        <SimpleForm>
            <TextInput label="Descripción" source="description" type="text" validate={required()}/>
            <ImageField disabled label="Imagen" source="path" title="description"/>
        </SimpleForm>
    </Edit>
);

export const UploadCreate = props => (
    <Create title="Subir imagen" {...props}>
        <SimpleForm toolbar={<Toolbar />}>
          <TextInput
            label="Descripción"
            source="description"
            type="text"
          />
          <ImageInput
            source="file"
            label="Imagen"
            accept="image/*"
            placeholder={<p>Arrastra tu archivo aquí</p>}
          >
            <ImageField source="src" title="title"/>
          </ImageInput>
        </SimpleForm>
    </Create>
);
