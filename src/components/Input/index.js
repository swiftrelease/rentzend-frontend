import React from 'react';
import { Field } from 'formik';
import TextField from '@material-ui/core/TextField';

const Input = ({ name, label, placeholder, required, ...rest }) => (
  <Field
    name={name}
    render={({ field, form: { touched, errors } }) => {
      const error = touched[name] && errors[name];
      return (
        <TextField
          id={name}
          variant="outlined"
          margin="dense"
          label={error || label}
          placeholder={placeholder}
          required={required}
          error={Boolean(error)}
          {...field}
          {...rest}
        />
      );
    }}
  />
);

export default Input;
