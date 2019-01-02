import * as React from 'react';
import { FieldProps } from 'formik';
import { Item, Label, Text } from 'native-base';
import getBorder from '../../utils/addBorder';
import ColorPalette from 'react-native-color-palette'

export class ColorInputField extends React.Component<FieldProps<any> & { placeholder: string, addRef: (p: any) => void }> {
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
      <Item error={!!errorMsg} style={getBorder()} stackedLabel >
        <Label><Text>{props.placeholder}</Text></Label>
        <ColorPalette
          onChange={this.onChangeText}
          defaultColor={field.value}
          title=''
          colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
          icon={<Text>O</Text>}
        />
        {errorMsg ? <Text style={{ color: 'red' }}>{errorMsg}</Text> : null}
      </Item>
    );
  }
}