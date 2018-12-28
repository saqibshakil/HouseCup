import { ColorPicker } from 'react-native-color-picker';
const Picker = (_FieldProps) => {
    const { field: { value, onChange, name }, form: { setFieldValue } } = _FieldProps;
    return (React.createElement(ColorPicker, { onColorSelected: (color) => setFieldValue(name, color), style: { flex: 1 }, defaultColor: value }));
};
//# sourceMappingURL=colorPicker.js.map