import * as React from 'react';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import { validUserSchema } from '../../schema/user';
import { View, Button } from 'react-native';
import { InputField } from '../shared/Input';

interface FormValues {
  email: string;
  password: string;
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}

class C extends React.PureComponent<FormikProps<FormValues> & Props> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <View>
        <Field name='email' placeholder='Email' component={InputField} />
        <Field
          name='password'
          secureTextEntry={true}
          placeholder='Password'
          component={InputField}
        />
        <Button title='Submit' onPress={handleSubmit as any} />
      </View>
    );
  }
}

export const RegisterView = withFormik<Props, FormValues>({
  validationSchema: validUserSchema,
  mapPropsToValues: () => ({ email: '', password: '' }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);