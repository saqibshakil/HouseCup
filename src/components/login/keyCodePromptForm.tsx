import * as React from 'react';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import { keyCodeSchema } from '../../schema/teacher';
import { View, Button, Text, Spinner } from 'native-base';
import { InputField } from '../shared/Input';

interface FormValues {
  keyCode: string,
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  saving: boolean
}

class C extends React.Component<FormikProps<FormValues> & Props> {
  inputs: any[] = []

  onSubmitEditing: () => void = undefined // () => {}
  addRef = (p: any) => {
    this.inputs.push(p)
  }

  render() {
    const { handleSubmit, saving } = this.props;
    return (
      <View>
        <Field name='keyCode' placeholder='Key Code' component={InputField}
          returnKeyType='done' onSubmitEditing={handleSubmit} />
        <Button block disabled={saving} onPress={handleSubmit as any}>
          <Text>Continue</Text>
          {saving && <Spinner color='white' />}
        </Button>
      </View>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: keyCodeSchema,
  mapPropsToValues: () => {
    return ({ keyCode: '' })
  },
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);