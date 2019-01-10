import * as React from 'react';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import TeacherSchema from '../../schema/teacher';
import { View, Button, Text, Spinner } from 'native-base';
import { InputField } from '../shared/Input';

interface FormValues {
  email: string;
  empId: string;
  name: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  saving: boolean,
  teacher: any
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  inputs: any[] = []

  addRef = (p: any) => {
    this.inputs.push(p)
  }

  render() {
    const { handleSubmit, saving, teacher } = this.props;
    return (
      <View style={{ marginHorizontal: 10, marginVertical: 5 }}>
        <Field name='empId' placeholder='Employee ID' component={InputField} keyboardType='default'
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[0].focus(); }} />
        <Field name='name' placeholder='Name' component={InputField} addRef={this.addRef}
          returnKeyType={teacher.id ? 'done' : 'next'} onSubmitEditing={() => { teacher.id ? handleSubmit() : this.inputs[1].focus(); }} />
        <Field name='email' disabled={!!(teacher.id)}
          placeholder='Email Address' component={InputField} keyboardType='email-address' addRef={this.addRef}
          returnKeyType={'done'} onSubmitEditing={() => { handleSubmit() }} />
        <Button block disabled={saving} onPress={handleSubmit as any}>
          <Text>Submit</Text>
          {saving && <Spinner color='white' />}
        </Button>
      </View>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: TeacherSchema,
  mapPropsToValues: (params: any) => {
    return params.teacher
  },
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);