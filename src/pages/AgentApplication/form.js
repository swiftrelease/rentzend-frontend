import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useDropzone } from 'react-dropzone';
import uniqid from 'uniqid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import get from 'lodash/fp/get';

import Input from '../../components/Input';
import FileChip from '../../components/FileChip';
import Notification from '../../components/Notification';
import { APPLICATION_SCHEMA } from './validation';
import {
  MAX_UPLOAD_SIZE,
  NOTIFICATION_MESSAGES,
  NOTIFICATION_TYPES,
} from './constants';


const AgentApplicationForm = ({ createAgentApplication, onSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [files, setFiles] = useState([]);

  const getUploadButtonContent = () => {
    if (isDragging) return 'Drop your files here';
    return 'Click or drop to upload your documents';
  };

  useEffect(() => {
    const dragEnterHandler = () => setIsDragging(true);
    const dragEndHandler = () => setIsDragging(false);
    window.addEventListener('dragenter', dragEnterHandler);
    window.addEventListener('drop', dragEndHandler);
    return () => {
      window.removeEventListener('dragenter', dragEndHandler);
      window.removeEventListener('drop', dragEndHandler);
    };
  }, []);

  const handleFileDrop = async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) setNotification('fileSize');

    if (acceptedFiles.length > 0) {
      setFiles([
        ...files,
        ...acceptedFiles.map(file => ({
          file,
          id: uniqid(),
        }))
      ]);
    }
  };

  const handleFileDelete = id => () => {
    setFiles(files.filter(it => it.id !== id));
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { data } = await createAgentApplication({
        variables: {
          application: values,
          attachments: files.map(get('file')),
        },
      });
      // This is our response. Not much we can do with it here
      // in the context of the existing UI.
      console.log(data.application);
      setNotification('submitted');
    } catch (e) {
      setNotification('request');
    }
    setLoading(false);
  };

  const handleNotificationClose = () => {
    if (notification !== 'submitted') return setNotification(null);
    
    onSuccess();
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleFileDrop,
    multiple: true,
    maxSize: MAX_UPLOAD_SIZE,
  });

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        address: '',
        zipCode: '',
      }}
      validationSchema={APPLICATION_SCHEMA}
      onSubmit={handleSubmit}
    >
      {(/* { values, touched, errors } */) => {
        // Everything is hooked up automaitcally here,
        // but we could use the above Formik props if we needed to.
        return (
          <Form style={{ display: 'flex', flexDirection: 'column' }}>
            <Input
              name="name"
              label="Full name *"
              placeholder="Jane Doe"
            />
            <Input
              name="email"
              label="Email *"
              placeholder="john.doe@email.com"
            />
            <Input
              name="phone"
              label="Phone number *"
              placeholder="(123) 456-7899"
            />
            <Input
              name="address"
              label="Address"
              placeholder="Some st. 21"
            />
            <Input
              name="zipCode"
              label="ZIP code"
              placeholder="94203"
            />
            <div className="chips-container">
              {
                files.map(({ id, file }) => (
                  <FileChip
                    file={file}
                    key={id}
                    onDelete={handleFileDelete(id)}
                  />
                ))
              }
            </div>
            <div style={{ marginTop: '16px' }} {...getRootProps()}>
              <Button
                variant={isDragging ? 'outlined' : 'contained'}
                color={isDragging ? 'primary' : 'default'}
                fullWidth
              >
                <input {...getInputProps()} />
                {getUploadButtonContent()}
              </Button>
            </div>
            <div style={{ marginTop: '20px' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                {isLoading ? <CircularProgress /> : 'Submit'}
              </Button>
            </div>
            <Notification
              type={NOTIFICATION_TYPES[notification]}
              open={Boolean(notification)}
              onClose={handleNotificationClose}
              message={NOTIFICATION_MESSAGES[notification]}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default AgentApplicationForm;
