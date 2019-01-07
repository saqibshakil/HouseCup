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
import StudentSchema from '../../schema/student';
import { View, Button, Text, Spinner } from 'native-base';
import { InputField } from '../shared/Input';
import KeyboardPad from '../shared/KeyboardPad';
import HouseSelect from '../shared/HouseSelect';
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
            React.createElement(Field, { name: 'grNo', addRef: this.addRef, placeholder: 'GR Number', component: InputField, onValueChanged: this.props.checkAndPopuplate, returnKeyType: 'next', onSubmitEditing: () => { this.inputs[1].focus(); } }),
            React.createElement(Field, { name: 'name', addRef: this.addRef, placeholder: 'Name', component: InputField, returnKeyType: 'next', onSubmitEditing: () => { this.inputs[2].focus(); } }),
            React.createElement(Field, { name: 'class', addRef: this.addRef, placeholder: 'Class', component: InputField }),
            React.createElement(Field, { name: 'houseId', placeholder: 'House', component: HouseSelect }),
            React.createElement(Button, { block: true, disabled: saving, onPress: submit },
                React.createElement(Text, null, "Submit"),
                saving && React.createElement(Spinner, { color: 'white' })),
            React.createElement(KeyboardPad, null)));
    }
}
export default withFormik({
    validationSchema: StudentSchema,
    mapPropsToValues: (props) => {
        return (Object.assign({}, props.student));
    },
    handleSubmit: (values, { props, setErrors }) => __awaiter(this, void 0, void 0, function* () {
        const errors = yield props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    })
})(C);
//# sourceMappingURL=studentAddForm.js.map