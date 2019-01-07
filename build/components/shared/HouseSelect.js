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
import { Item, Label, Text, View, Button } from 'native-base';
import getBorder from '../../utils/addBorder';
import { connect } from 'react-redux';
class HouseSelectField extends React.Component {
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
            React.createElement(View, { style: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' } }, props.houses.map((p) => React.createElement(View, { key: p.id, style: {
                    width: '49%', marginVertical: 5, flexDirection: 'column',
                    borderWidth: field.value === p.id ? 2 : 0, borderColor: 'green'
                } },
                React.createElement(Button, { block: true, style: {
                        backgroundColor: p.color, flexDirection: 'column'
                    }, onPress: () => this.onChangeText(p.id), light: true },
                    React.createElement(Text, null,
                        field.value === p.id ? '✔ ' : '',
                        p.name))))),
            errorMsg ? React.createElement(Text, { style: { color: 'red' } }, errorMsg) : null));
    }
}
function mapStateToProps(state) {
    return {
        houses: state.house.houses
    };
}
export default connect(mapStateToProps)(HouseSelectField);
//# sourceMappingURL=HouseSelect.js.map