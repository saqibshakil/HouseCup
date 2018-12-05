import * as yup from 'yup';

export const notLongEnough = 'Too short';
export const invalidEmail = 'Invalid email';
export const mandatory = 'Mandatory'

export default yup.object().shape({
  email: yup
    .string()
    .min(3, notLongEnough)
    .max(200)
    .email(invalidEmail)
    .required(mandatory),
    name: yup
    .string()
    .min(3, notLongEnough)
    .max(200)
    .required(),
    empId: yup
    .string()
    .min(2)
    .max(30)
    .required(),
    password: yup
    .string()
    .min(8)
    .max(16)
    .required(),
    confirmPassword: yup
    .string()
    .min(8)
    .max(16)
    .oneOf([yup.ref('password')], 'Password dont match')
    .required(),
    keyCode: yup
    .string()
    .min(8)
    .max(8)
    .required()
  });