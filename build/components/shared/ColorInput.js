var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import * as React from 'react';
import { Item, Label, Text } from 'native-base';
import getBorder from '../../utils/addBorder';
import ColorPalette from 'react-native-color-palette';
export class ColorInputField extends React.Component {
    constructor() {
        super(...arguments);
        this.onChangeText = (text) => {
            const { form: { setFieldValue }, field: { name } } = this.props;
            setFieldValue(name, text);
        };
        this.onBlur = () => {
            const { form: { setFieldTouched }, field: { name } } = this.props;
            setFieldTouched(name, true);
        };
    }
    render() {
        const _a = this.props, { field, // { name, value, onChange, onBlur }
        form: { touched, errors } } = _a, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        props = __rest(_a, ["field", "form"]);
        const errorMsg = touched[field.name] && errors[field.name];
        return (React.createElement(Item, { error: !!errorMsg, style: getBorder(), stackedLabel: true },
            React.createElement(Label, null,
                React.createElement(Text, null, props.placeholder)),
            React.createElement(ColorPalette, { onChange: this.onChangeText, defaultColor: field.value, title: '', colors: ['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9'], icon: React.createElement(Text, null, "O") }),
            errorMsg ? React.createElement(Text, { style: { color: 'red' } }, errorMsg) : null));
    }
}
//# sourceMappingURL=ColorInput.js.map