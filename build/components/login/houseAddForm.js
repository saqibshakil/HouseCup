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
import { View, Button } from "react-native";
import { InputField } from "../shared/Input";
class C extends React.PureComponent {
    render() {
        const { handleSubmit } = this.props;
        return (React.createElement(View, null,
            React.createElement(Field, { name: "empId", placeholder: "Employee ID", component: InputField }),
            React.createElement(Field, { name: "name", placeholder: "Name", component: InputField }),
            React.createElement(Field, { name: "email", placeholder: "Email Address", component: InputField }),
            React.createElement(Button, { title: "Next", onPress: handleSubmit })));
    }
}
export default withFormik({
    validationSchema: TeacherSchema,
    mapPropsToValues: () => ({ email: "", name: "", empId: '' }),
    handleSubmit: (values, { props, setErrors }) => __awaiter(this, void 0, void 0, function* () {
        const errors = yield props.submit(values);
        if (errors) {
            setErrors(errors);
        }
    })
})(C);
//# sourceMappingURL=houseAddForm.js.map