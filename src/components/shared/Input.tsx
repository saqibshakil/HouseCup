import * as React from "react";
import { FieldProps } from "formik";
import { Input, Item, Label, Text } from "native-base";

export class InputField extends React.Component<FieldProps<any> & { placeholder: string }> {
  onChangeText = (text: string) => {
    const {
      form: { setFieldValue },
      field: { name }
    } = this.props;
    setFieldValue(name, text);
  };

  onBlur = () => {
    const {
      form: { setFieldTouched },
      field: { name }
    } = this.props;
    setFieldTouched(name, true);
  };

  render() {
    const {
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
    } = this.props;
    const errorMsg = touched[field.name] && errors[field.name];
    return (
      <Item error={!!errorMsg}>
                <Label><Text></Text></Label>
                <Input {...props} onChangeText={this.onChangeText}
        onBlur={this.onBlur}
         />
                {errorMsg ? <Text>{errorMsg}</Text> : null}
            </Item>
    );
  }
}