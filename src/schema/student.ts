import * as yup from 'yup'

export const nameNotLongEnough = 'Too short'

export default yup.object().shape({
  grNo: yup
    .string()
    .min(3, nameNotLongEnough)
    .max(255, 'Too long')
    .required('Mandatory'),
  name: yup
    .string()
    .min(3, nameNotLongEnough)
    .max(255, 'Too long')
    .required('Mandatory'),
  class: yup
    .string()
    .max(10, 'Too long')
    .required('Mandatory'),
    houseId: yup.number().required('Mandatory')
});