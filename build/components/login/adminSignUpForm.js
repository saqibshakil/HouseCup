var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { withFormik, Field } from 'formik';
import TeacherSchema from '../../schema/teacher';
import { View, Button, Text, Spinner } from 'native-base';
import { InputField } from '../shared/Input';
class C extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.inputs = [];
        this.addRef = (p) => {
            this.inputs.push(p);
        };
    }
    render() {
        const { handleSubmit, saving, teacher } = this.props;
        return (React.createElement(View, { style: { marginHorizontal: 10, marginVertical: 5 } },
            React.createElement(Field, { name: 'empId', placeholder: 'Employee ID', component: InputField, keyboardType: 'default', returnKeyType: 'next', onSubmitEditing: () => { this.inputs[0].focus(); } }),
            React.createElement(Field, { name: 'name', placeholder: 'Name', component: InputField, addRef: this.addRef, returnKeyType: teacher && teacher.id ? 'done' : 'next', onSubmitEditing: () => { teacher && teacher.id ? handleSubmit() : this.inputs[1].focus(); } }),
            React.createElement(Field, { name: 'email', disabled: !!(teacher && teacher.id), placeholder: 'Email Address', component: InputField, keyboardType: 'email-address', addRef: this.addRef, returnKeyType: 'done', onSubmitEditing: () => { handleSubmit(); } }),
            React.createElement(Button, { block: true, disabled: saving, onPress: handleSubmit },
                React.createElement(Text, null, "Submit"),
                saving && React.createElement(Spinner, { color: 'white' }))));
    }
}
export default withFormik({
    validationSchema: TeacherSchema,
    mapPropsToValues: (params) => {
        return params.teacher;
    },
    handleSubmit: (values, { props, setErrors }) => __awaiter(this, void 0, void 0, function* () {
        const errors = yield props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    })
})(C);
//# sourceMappingURL=adminSignUpForm.js.map