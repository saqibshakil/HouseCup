import * as yup from "yup";

export const notLongEnough = "Too short";
export const invalidEmail = "Invalid email";
export const mandatory = "Mandatory"

export default yup.object().shape({
  email: yup
    .string()
    .min(3, notLongEnough)
    .max(200)
    .email(invalidEmail)
    .required(),
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
    
  });