import * as React from 'react';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import ReasonSchema from '../../schema/reason';
import { View, Button, Text, Spinner } from 'native-base';
import { InputField } from '../shared/Input';
import KeyboardPad from '../shared/KeyboardPad'
import { CategoryInputField } from '../shared/CategoryInput';

interface FormValues {
  name: string;
  slogan: string,
  color: string,
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  reason?: any,
  saving?: boolean
}

class ReasonAddForm extends React.Component<FormikProps<FormValues> & Props> {
  inputs: any[] = []

  addRef = (p: any) => {
    this.inputs.push(p)
  }

  render() {
    const { handleSubmit, saving } = this.props;
    const submit = () => {
      handleSubmit()
    }
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Field name='reason' addRef={this.addRef} placeholder='Reason' component={InputField}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[1].focus(); }} />
        <Field name='isGood' addRef={this.addRef} placeholder='Category' component={CategoryInputField}
          returnKeyType={'done'} onSubmitEditing={() => { submit() }} />
        <Button block disabled={saving} onPress={submit as any}>
          <Text>Submit</Text>
          {saving && <Spinner color='white' />}
        </Button>
        <KeyboardPad />
      </View>
    );
  }
}

export default withFormik<Props, FormValues>({
  validationSchema: ReasonSchema,
  mapPropsToValues: (props) => {
    return ({ ...props.reason })
  },
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(ReasonAddForm);