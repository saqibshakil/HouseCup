import * as yup from 'yup';
export const notLongEnough = 'Too short';
export const invalidEmail = 'Invalid email';
export const mandatory = 'Mandatory';
export default yup.object().shape({
    slogan: yup
        .string()
        .min(3, notLongEnough)
        .max(200)
        .required(),
    name: yup
        .string()
        .min(3, notLongEnough)
        .max(20)
        .required(),
    color: yup
        .string()
        .min(2)
        .max(7)
        .required()
});
//# sourceMappingURL=house.js.map