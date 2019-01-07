import * as React from 'react'
import { FieldProps } from 'formik'
import { Input, Item, Label, Text } from 'native-base'

interface IProps {
  placeholder: string, addRef: (p: any) => void, onValueChanged?: (props: FieldProps<any>, value: string) => void
}

export class InputField extends React.Component<FieldProps<any> & IProps> {
  onChangeText = (text: string) => {
    const {
      form: { setFieldValue },
      field: { name },
      onValueChanged
    } = this.props;
    setFieldValue(name, text);
    if (onValueChanged)
      onValueChanged(this.props, text)
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
      <Item error={!!errorMsg} stackedLabel >
        <Label><Text>{props.placeholder}</Text></Label>
        <Input {...inputProps} defaultValue={field.value} onChangeText={this.onChangeText}
          onBlur={this.onBlur} style={{ borderBottomColor: '#8cb8ff', borderBottomWidth: 2 }}
        />
        {errorMsg ? <Text style={{ color: 'red' }}>{errorMsg}</Text> : null}
      </Item>
    );
  }
}