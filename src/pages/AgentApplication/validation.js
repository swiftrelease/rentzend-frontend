import * as yup from 'yup';

export const APPLICATION_SCHEMA = yup.object({
  name: yup.string().required('Please enter your name'),
  email: yup
    .string()
    .email('Please make sure the email format is correct')
    .required('Please enter your email'),
  phone: yup
    .string()
    .matches(/\(\d{3}\) \d{3}-\d{4}/, 'Please use the following format: (123) 456-7899')
    .required('Please enter your phone number'),
  address: yup.string(),
  zipCode: yup.string(),
});
