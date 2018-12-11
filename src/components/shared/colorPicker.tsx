import { ColorPicker } from 'react-native-color-picker'
import { FieldProps } from 'formik';
const Picker = (_FieldProps: FieldProps) => {
    const { field: { value, onChange, name  }, form: { setFieldValue } } = _FieldProps
    return     (
    <ColorPicker
        onColorSelected={(color: string) => setFieldValue(name, color)}
        style={{ flex: 1 }}
        defaultColor={value}
    />
)
}