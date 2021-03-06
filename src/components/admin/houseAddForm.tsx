import * as React from 'react';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import HouseSchema from '../../schema/house';
import { View, Button, Text, Spinner } from 'native-base';
import { InputField } from '../shared/Input';
import KeyboardPad from '../shared/KeyboardPad'
import { ColorInputField } from '../shared/ColorInput';

interface FormValues {
  name: string;
  slogan: string,
  color: string,
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  house?: any,
  saving?: boolean
}

class C extends React.Component<FormikProps<FormValues> & Props> {
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
        <Field name='name' addRef={this.addRef} placeholder='Name' component={InputField}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[1].focus(); }} />
        <Field name='slogan' addRef={this.addRef} placeholder='Slogan' component={InputField}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[2].focus(); }} />
        <Field name='color' addRef={this.addRef} placeholder='Color' component={ColorInputField}
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
  validationSchema: HouseSchema,
  mapPropsToValues: (props) => {
    return ({ ...props.house })
  },
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);