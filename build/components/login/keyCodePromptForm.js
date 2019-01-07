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
import { keyCodeSchema } from '../../schema/teacher';
import { View, Button, Text, Spinner } from 'native-base';
import { InputField } from '../shared/Input';
class C extends React.Component {
    constructor() {
        super(...arguments);
        this.inputs = [];
        this.onSubmitEditing = undefined; // () => {}
        this.addRef = (p) => {
            this.inputs.push(p);
        };
    }
    render() {
        const { handleSubmit, saving } = this.props;
        return (React.createElement(View, { style: { marginHorizontal: 10, marginVertical: 5 } },
            React.createElement(Field, { name: 'keyCode', placeholder: 'Key Code', component: InputField, returnKeyType: 'done', onSubmitEditing: handleSubmit }),
            React.createElement(Button, { block: true, disabled: saving, onPress: handleSubmit },
                React.createElement(Text, null, "Continue"),
                saving && React.createElement(Spinner, { color: 'white' }))));
    }
}
export default withFormik({
    validationSchema: keyCodeSchema,
    mapPropsToValues: () => {
        return ({ keyCode: '' });
    },
    handleSubmit: (values, { props, setErrors }) => __awaiter(this, void 0, void 0, function* () {
        const errors = yield props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    })
})(C);
//# sourceMappingURL=keyCodePromptForm.js.map