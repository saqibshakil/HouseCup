import * as yup from "yup";

export const notLongEnough = "Too short";
export const invalidEmail = "Invalid email";
export const mandatory = "Mandatory"
export const keyCodeLength = "8 character code";
export const keyCodeSchema= yup.object().shape({
    keyCode: yup
    .string()
    .min(8, keyCodeLength)
    .max(8, keyCodeLength)
    .required(mandatory),
  }); 

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
    .required(mandatory),
    empId: yup
    .string()
    .min(2)
    .max(30)
    .required(mandatory),
    
  });