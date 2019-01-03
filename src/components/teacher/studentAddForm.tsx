import * as React from 'react';
import { withFormik, FormikErrors, FormikProps, Field, FieldProps } from 'formik';
import StudentSchema from '../../schema/student';
import { View, Button, Text, Spinner } from 'native-base';
import { InputField } from '../shared/Input';
import KeyboardPad from '../shared/KeyboardPad'
import HouseSelect from '../shared/HouseSelect';

interface FormValues {
  name: string;
  class: string,
  grNo: string,
  houseId: string
}

interface Props {
  submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
  student?: any,
  saving?: boolean,
  checkAndPopuplate: (props: FieldProps<any>, value: string) => void
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
        <Field name='grNo' addRef={this.addRef} placeholder='GR Number' component={InputField} onValueChanged={this.props.checkAndPopuplate}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[1].focus(); }} />
        <Field name='name' addRef={this.addRef} placeholder='Name' component={InputField}
          returnKeyType={'next'} onSubmitEditing={() => { this.inputs[2].focus(); }} />
        <Field name='class' addRef={this.addRef} placeholder='Class' component={InputField}
        />
        <Field name='houseId' placeholder='House' component={HouseSelect} />
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
  validationSchema: StudentSchema,
  mapPropsToValues: (props) => {
    return ({ ...props.student })
  },
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  }
})(C);