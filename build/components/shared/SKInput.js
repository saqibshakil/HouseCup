/*import React from 'react';

interface IProps {
    id: string, // the field.key
    value: string, // input value
    onFocus: (...args: any) => void, // function
    onChange: (...args: any) => void, // function
    onBlur: (...args: any) => void, // function
    isValid: boolean, // boolean
    showWarnings: boolean, // boolean
    validatorMessage: string[], // array of errors
    required: boolean, // boolean
    placeholder: string, // string
    label: string, // string,
    requiredPrefix: string, // string
    labelWithPrefix: string, //string
    disabled: boolean, // boolean
    autoFocus: boolean, // boolean
    onRef: (...args: any) => void, // function
    focusNext: (...args: any) => void // function (Run to focus on the next input)
    getOtherFieldRefByKey: (...args: any) => void// function that return other field ref by the field key
    // and all the rest from your field config
}

export default class MyInput extends React.Component<IProps> {
    render() {
        const {
            id, // the field.key
            value, // input value
            onFocus, // function
            onChange, // function
            onBlur, // function
            isValid, // boolean
            showWarnings, // boolean
            validatorMessage, // array of errors
            required, // boolean
            placeholder, // string
            label, // string,
            labelWithPrefix, //string
            disabled, // boolean
            autoFocus, // boolean
            requiredPrefix, // string
            onRef, // function
            focusNext, // function (Run to focus on the next input)
            getOtherFieldRefByKey// function that return other field ref by the field key
            // and all the rest from your field config
        } = this.props;
        return (
            <div>
                <label> {labelWithPrefix} </label>
                <input
                    ref={ref => {
                        onRef(ref);
                    }}
                    value={value}
                    onFocus={onFocus}
                    onChange={e => onChange(e.target.value)}
                    onBlur={onBlur}
                    disabled={disabled}
                />
                {showWarnings && <p>{validatorMessage}</p>}
            </div>
        );
    }
}*/ 
//# sourceMappingURL=SKInput.js.map