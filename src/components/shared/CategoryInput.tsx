import * as React from 'react';
import { FieldProps } from 'formik';
import { Item, Label, Text } from 'native-base';
import ColorPalette from 'react-native-color-palette'

export const categories = ['#E30000', '#E39500', '#E3D800', '#A8D900', '#12BA00']
export class CategoryInputField extends React.Component<FieldProps<any> & { placeholder: string, addRef: (p: any) => void }> {

  onChangeText = (text: string) => {
    const {
      form: { setFieldValue },
      field: { name }
    } = this.props;
    setFieldValue(name, categories.findIndex(p => p === text));
  };

  onBlur = () => {
    const {
      form: { setFieldTouched },
      field: { name }
    } = this.props;
    setFieldTouched(name, true)
  };

  render() {
    const {
      field, // { name, value, onChange, onBlur }
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      ...props
    } = this.props;

    const errorMsg = touched[field.name] && errors[field.name];
    return (
      <Item error={!!errorMsg} stackedLabel >
        <Label><Text>{props.placeholder}</Text></Label>
        <ColorPalette
          onChange={this.onChangeText}
          defaultColor={categories[field.value]}
          title=''
          colors={categories}
          icon={<Text>O</Text>}
        />
        {errorMsg ? <Text style={{ color: 'red' }}>{errorMsg}</Text> : null}
      </Item>
    );
  }
}