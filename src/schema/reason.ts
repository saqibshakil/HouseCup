import * as yup from 'yup';

export const notLongEnough = 'Too short';
export const invalidEmail = 'Invalid email';
export const mandatory = 'Mandatory'

export default yup.object().shape({
  reason: yup
    .string()
    .min(3, notLongEnough)
    .max(200)
    .required(mandatory),
  isGood: yup
    .number()
    .min(1)
    .max(5)
    .required(mandatory)
  });