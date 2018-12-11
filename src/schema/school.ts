import * as yup from 'yup'

export const nameNotLongEnough = 'Too short'

export default yup.object().shape({
  name: yup
    .string()
    .min(3, nameNotLongEnough)
    .max(255,"Too long")
    .required("Mandatory")
  });