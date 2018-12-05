import * as React from 'react';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import TeacherSchemaFull from '../../schema/teacherFull';
import { View, Button, Text, Spinner } from 'native-base';
import { InputField } from '../shared/Input';
import KeyboardPad from '../shared/KeyboardPad'
import getBorder from '../../utils/addBorder';

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

  addRef = (p: any) => {
    this.inputs.push(p)
  }

  render() {
    const { handleSubmit, saving } = this.props;
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Field name='empId' placeholder='Employee ID' component={InputField} editable={false}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[0].focus(); }} />
        <Field name='name' addRef={this.addRef} placeholder='Name' component={InputField} editable={false}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[1].focus(); }} />
        <Field name='email' addRef={this.addRef} placeholder='Email Address' component={InputField} keyboardType='email-address' editable={false}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[2].focus(); }} />
        <Field name='password' addRef={this.addRef} placeholder='Password' secureTextEntry={true} component={InputField}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[3].focus(); }} />
        <Field name='confirmPassword' addRef={this.addRef} placeholder='Confirm Password' secureTextEntry={true} component={InputField}
           returnKeyType={'done'} onSubmitEditing={handleSubmit} />
        <Button block disabled={saving} onPress={handleSubmit as any}>
          <Text>Submit</Text>
          {saving && <Spinner color='white' />}
        </Button>
        <KeyboardPad />
      </View>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: TeacherSchemaFull,
  mapPropsToValues: (props) => {
    return ({ ...props.teacher, password: '', confirmPassword: '' })
  },
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);