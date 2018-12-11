import * as React from 'react';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import TeacherSchemaFull from '../../schema/teacherFull';
import { View, Button, Text, Spinner } from 'native-base';
import { InputField } from '../shared/Input';
import KeyboardPad from '../shared/KeyboardPad'

interface FormValues {
  name: string;
  slogan: string,
  color: string,
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  house: any,
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
        <Field name='name' addRef={this.addRef} placeholder='Name' component={InputField}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[1].focus(); }} />
        <Field name='slogan' addRef={this.addRef} placeholder='Slogan' component={InputField}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[2].focus(); }} />
        <Field name='color' addRef={this.addRef} placeholder='Slogan' component={InputField}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[2].focus(); }} />
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