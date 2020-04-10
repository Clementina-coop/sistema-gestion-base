import React from 'react';
import ApproveButton from './button.js';
import { Toolbar } from 'react-admin';

const UploadToolbar = props => (
    <Toolbar {...props} >
        <ApproveButton />
    </Toolbar>
);

export default UploadToolbar;
