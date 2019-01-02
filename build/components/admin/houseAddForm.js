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
import HouseSchema from '../../schema/house';
import { View, Button, Text, Spinner } from 'native-base';
import { InputField } from '../shared/Input';
import KeyboardPad from '../shared/KeyboardPad';
import { ColorInputField } from '../shared/ColorInput';
class C extends React.Component {
    constructor() {
        super(...arguments);
        this.inputs = [];
        this.addRef = (p) => {
            this.inputs.push(p);
        };
    }
    render() {
        const { handleSubmit, saving } = this.props;
        const submit = () => {
            handleSubmit();
        };
        return (React.createElement(View, { style: { flexDirection: 'column', flex: 1 } },
            React.createElement(Field, { name: 'name', addRef: this.addRef, placeholder: 'Name', component: InputField, returnKeyType: 'next', onSubmitEditing: () => { this.inputs[1].focus(); } }),
            React.createElement(Field, { name: 'slogan', addRef: this.addRef, placeholder: 'Slogan', component: InputField, returnKeyType: 'next', onSubmitEditing: () => { this.inputs[2].focus(); } }),
            React.createElement(Field, { name: 'color', addRef: this.addRef, placeholder: 'Color', component: ColorInputField, returnKeyType: 'done', onSubmitEditing: () => { submit(); } }),
            React.createElement(Button, { block: true, disabled: saving, onPress: submit },
                React.createElement(Text, null, "Submit"),
                saving && React.createElement(Spinner, { color: 'white' })),
            React.createElement(KeyboardPad, null)));
    }
}
export default withFormik({
    validationSchema: HouseSchema,
    mapPropsToValues: (props) => {
        return (Object.assign({}, props.house));
    },
    handleSubmit: (values, { props, setErrors }) => __awaiter(this, void 0, void 0, function* () {
        const errors = yield props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    })
})(C);
//# sourceMappingURL=houseAddForm.js.map