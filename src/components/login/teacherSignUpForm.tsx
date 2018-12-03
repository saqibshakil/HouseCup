import * as React from "react";
import { withFormik, FormikErrors, FormikProps, Field } from "formik";
import TeacherSchema from "../../schema/teacher";
import { View, Button, Text, Spinner } from "native-base";
import { InputField } from "../shared/Input";
import KeyboardPad from "../shared/KeyboardPad"
import { KeyboardAvoidingView } from "react-native";
import getBorder from "../../utils/addBorder";

interface FormValues {
  email: string;
  empId: string;
  name: string;
  password: string;
  confirmPassword: string,
  keyCode: string,
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  teacher: any,
  saving: boolean
}

class C extends React.Component<FormikProps<FormValues> & Props> {
  inputs: any[] = []

  onSubmitEditing = () => { }
  addRef = (p: any) => {
    this.inputs.push(p)
  }

  render() {
    const { handleSubmit, saving } = this.props;
    return (
      <View style={{...getBorder(), flexDirection: "column", flex: 0}}>
        <Field name="empId" placeholder="Employee ID" component={InputField}
          returnKeyType={"next"} onSubmitEditing={() => { this.inputs[0].focus(); }} />
        <Field name="name" addRef={this.addRef} placeholder="Name" component={InputField}
          returnKeyType={"next"} onSubmitEditing={() => { this.inputs[1].focus(); }} />
        <Field name="email" addRef={this.addRef} placeholder="Email Address" component={InputField}
          returnKeyType={"next"} onSubmitEditing={handleSubmit} />
        <Field name="password" addRef={this.addRef} placeholder="Password" secureTextEntry={true} component={InputField}
          returnKeyType={"next"} onSubmitEditing={handleSubmit} />
        <Field name="confirmPassword" addRef={this.addRef} placeholder="Confirm Password" secureTextEntry={true} component={InputField}
          returnKeyType={"done"} onSubmitEditing={handleSubmit} />
        <Button block disabled={saving} onPress={handleSubmit as any}>
          <Text>Submit</Text>
          {saving && <Spinner color="white" />}
        </Button>
        <KeyboardPad/>
      </View>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: TeacherSchema,
  mapPropsToValues: (props) => {
    return ({ ...props.teacher, empId: '322' })
  },
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);