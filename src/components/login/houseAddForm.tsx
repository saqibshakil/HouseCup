import * as React from "react";
import { withFormik, FormikErrors, FormikProps, Field } from "formik";
import TeacherSchema from "../../schema/teacher";
import { View, Button } from "react-native";
import { InputField } from "../shared/Input";

interface FormValues {
  email: string;
  empId: string;
  name: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View>
        <Field name="empId" placeholder="Employee ID" component={InputField} />
        <Field name="name" placeholder="Name" component={InputField} />
        <Field name="email" placeholder="Email Address" component={InputField} />
        <Button title="Next" onPress={handleSubmit as any} />
      </View>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: TeacherSchema,
  mapPropsToValues: () => ({ email: "", name: "", empId: '' }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);