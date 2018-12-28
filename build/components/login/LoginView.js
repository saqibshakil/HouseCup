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
import { validUserSchema } from '../../schema/user';
import { View } from 'react-native';
import { InputField } from '../shared/Input';
import { Button, Spinner, Text } from 'native-base';
import KeyboardPad from '../shared/KeyboardPad';
class LoginViewForm extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.inputs = [];
        this.addRef = (p) => {
            this.inputs.push(p);
        };
    }
    render() {
        const { handleSubmit } = this.props;
        return (React.createElement(View, null,
            React.createElement(Field, { name: 'email', placeholder: 'Email', component: InputField, keyboardType: 'email-address', returnKeyType: 'next', onSubmitEditing: () => { this.inputs[0].focus(); } }),
            React.createElement(Field, { name: 'password', secureTextEntry: true, placeholder: 'Password', component: InputField, addRef: this.addRef, returnKeyType: 'done', onSubmitEditing: handleSubmit }),
            React.createElement(Button, { primary: true, onPress: handleSubmit, block: true, disabled: this.props.saving },
                React.createElement(Text, null, "Login"),
                this.props.saving && React.createElement(Spinner, { color: 'white' })),
            React.createElement(KeyboardPad, null)));
    }
}
export default withFormik({
    validationSchema: validUserSchema,
    mapPropsToValues: () => ({ email: '', password: '' }),
    handleSubmit: (values, { props, setErrors }) => __awaiter(this, void 0, void 0, function* () {
        const errors = yield props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    })
})(LoginViewForm);
//# sourceMappingURL=LoginView.js.map