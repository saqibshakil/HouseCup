import * as React from 'react';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import { validUserSchema } from '../../schema/user';
import { View } from 'react-native';
import { InputField } from '../shared/Input';
import { Button, Spinner, Text } from 'native-base'
import KeyboardPad from '../shared/KeyboardPad'
interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  saving: boolean
}

class LoginViewForm extends React.PureComponent<FormikProps<FormValues> & Props> {
  inputs: any[] = []

  addRef = (p: any) => {
    this.inputs.push(p)
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <View>
        <Field name='email' placeholder='Email' component={InputField} keyboardType='email-address'
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[0].focus(); }} />
        <Field
          name='password'
          secureTextEntry={true}
          placeholder='Password'
          component={InputField}
          addRef={this.addRef}
          returnKeyType={'done'} onSubmitEditing={handleSubmit}
        />
        <Button primary onPress={handleSubmit as any} block disabled={this.props.saving}>
          <Text>Login</Text>
          {this.props.saving && <Spinner color='white' />}
        </Button>
        <KeyboardPad />
      </View>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({ email: '', password: '' }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(LoginViewForm);