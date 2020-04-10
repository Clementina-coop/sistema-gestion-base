import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useNotify,
  useRedirect,
  fetchStart,
  fetchEnd,
  Button
} from 'react-admin';
import { Save } from "@material-ui/icons";
import { useForm } from 'react-final-form';

const ApproveButton = ({ record }) => {
  const dispatch = useDispatch();
  const redirect = useRedirect();
  const notify = useNotify();
  const [loading, setLoading] = useState(false);
  const form = useForm();
  const handleClick = () => {
    const jwt = window.localStorage.getItem("feathers-jwt");

    const fd = new FormData();
    const data = form.getState().values;
    fd.append('description', data.description);
    fd.append('file', data.file.rawFile);

    setLoading(true);
    dispatch(fetchStart());
    fetch(
      process.env.REACT_APP_API_URL + "/uploads",
      {
        'method': 'post',
        'body': fd,
        "headers": {
          "Authorization": "Bearer " + jwt
        }
      })
      .then((r) => {
        if (r.ok) {
          notify('Upload success', 'success');
          redirect('/uploads');
        } else {
          notify('Error while uploading file', 'warning')
        }
      })
      .finally(() => {
        setLoading(false);
        dispatch(fetchEnd());
      }
    );
  };
  return <Button
            startIcon={<Save />}
            size="medium"
            variant="contained"
            color="primary"
            label="Save"
            onClick={handleClick}
            disabled={loading}
          />;
};

export default ApproveButton;
