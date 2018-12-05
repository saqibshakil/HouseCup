import * as React from 'react';
import { FieldProps } from 'formik';
import { Input, Item, Label, Text } from 'native-base';
import getBorder from '../../utils/addBorder';

export class InputField extends React.Component<FieldProps<any> & { placeholder: string, addRef: (p: any) => void }> {
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
    const inputProps: any = {
      ...props,
      placeholder: undefined,
      addRef: undefined,
      ref: (p: any) => {
        if (props.addRef && p && p._root && p._root.focus)
          props.addRef(p._root)
      }
    }

    const errorMsg = touched[field.name] && errors[field.name];
    return (
      <Item error={!!errorMsg} style={getBorder()} stackedLabel >
        <Label><Text>{props.placeholder}</Text></Label>
        <Input {...inputProps} defaultValue={field.value} onChangeText={this.onChangeText}
          onBlur={this.onBlur}
        />
        {errorMsg ? <Text style={{ color: 'red' }}>{errorMsg}</Text> : null}
      </Item>
    );
  }
}