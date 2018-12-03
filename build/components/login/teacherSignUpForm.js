var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from "react";
import { withFormik, Field } from "formik";
import TeacherSchema from "../../schema/teacher";
import { View, Button, Text, Spinner } from "native-base";
import { InputField } from "../shared/Input";
import KeyboardPad from "../shared/KeyboardPad";
import getBorder from "../../utils/addBorder";
class C extends React.Component {
    constructor() {
        super(...arguments);
        this.inputs = [];
        this.onSubmitEditing = () => { };
        this.addRef = (p) => {
            this.inputs.push(p);
        };
    }
    render() {
        const { handleSubmit, saving } = this.props;
        return (React.createElement(View, { style: Object.assign({}, getBorder(), { flexDirection: "column", flex: 0 }) },
            React.createElement(Field, { name: "empId", placeholder: "Employee ID", component: InputField, returnKeyType: "next", onSubmitEditing: () => { this.inputs[0].focus(); } }),
            React.createElement(Field, { name: "name", addRef: this.addRef, placeholder: "Name", component: InputField, returnKeyType: "next", onSubmitEditing: () => { this.inputs[1].focus(); } }),
            React.createElement(Field, { name: "email", addRef: this.addRef, placeholder: "Email Address", component: InputField, returnKeyType: "next", onSubmitEditing: handleSubmit }),
            React.createElement(Field, { name: "password", addRef: this.addRef, placeholder: "Password", secureTextEntry: true, component: InputField, returnKeyType: "next", onSubmitEditing: handleSubmit }),
            React.createElement(Field, { name: "confirmPassword", addRef: this.addRef, placeholder: "Confirm Password", secureTextEntry: true, component: InputField, returnKeyType: "done", onSubmitEditing: handleSubmit }),
            React.createElement(Button, { block: true, disabled: saving, onPress: handleSubmit },
                React.createElement(Text, null, "Submit"),
                saving && React.createElement(Spinner, { color: "white" })),
            React.createElement(KeyboardPad, null)));
    }
}
export default withFormik({
    validationSchema: TeacherSchema,
    mapPropsToValues: (props) => {
        return (Object.assign({}, props.teacher, { empId: '322' }));
    },
    handleSubmit: (values, { props, setErrors }) => __awaiter(this, void 0, void 0, function* () {
        const errors = yield props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    })
})(C);
//# sourceMappingURL=teacherSignUpForm.js.map