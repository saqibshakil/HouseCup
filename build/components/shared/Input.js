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
import { Input, Item, Label, Text } from 'native-base';
export class InputField extends React.Component {
    constructor() {
        super(...arguments);
        this.onChangeText = (text) => {
            const { form: { setFieldValue }, field: { name }, onValueChanged } = this.props;
            setFieldValue(name, text);
            if (onValueChanged)
                onValueChanged(this.props, text);
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
        const inputProps = Object.assign({}, props, { placeholder: undefined, addRef: undefined, ref: (p) => {
                if (props.addRef && p && p._root && p._root.focus)
                    props.addRef(p._root);
            } });
        const errorMsg = touched[field.name] && errors[field.name];
        return (React.createElement(Item, { error: !!errorMsg, stackedLabel: true },
            React.createElement(Label, null,
                React.createElement(Text, null, props.placeholder)),
            React.createElement(Input, Object.assign({}, inputProps, { defaultValue: field.value, onChangeText: this.onChangeText, onBlur: this.onBlur, style: { borderBottomColor: '#8cb8ff', borderBottomWidth: 2 } })),
            errorMsg ? React.createElement(Text, { style: { color: 'red' } }, errorMsg) : null));
    }
}
//# sourceMappingURL=Input.js.map