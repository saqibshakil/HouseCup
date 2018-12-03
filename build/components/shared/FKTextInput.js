/*import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, TextInput, View } from 'react-native';
import { Input, Item, Label } from 'native-base'
interface IProps {
    disabled: boolean,
    field: {
        name: string,
        onBlur: any,
        onChange: any,
        value: string
    },
    form: {
        errors: any,
        touched: any
    }
}

const FKTextInput = ({
    disabled,
    field: {
        name,
        onBlur,
        onChange,
        value,
    },
    form: {
        errors,
        touched,
    },
}: IProps) => (
        <View>
            <TextInput
                onChangeText={onChange(name)}
                onBlur={onBlur(name)}
                editable={!disabled}
                // selectTextOnFocus={!disabled}
                style={[
                    styles.rootInput,
                    {
                        color: disabled ? 'gray' : 'black',
                        borderColor: errors[name] && touched[name] ? 'red' : 'gray'
                    },
                ]}
                value={value}
            />
            {errors[name] && touched[name] && <Text style={styles.rootError}>{errors[name]}</Text>}
        </View>
    );

const styles = StyleSheet.create({
    rootInput: {
        borderWidth: 1,
        height: 40,
        padding: 10,
    },
    rootError: {
        color: 'red',
    },
});

FKTextInput.defaultProps = {
    disabled: false,
};

export default FKTextInput;*/ 
//# sourceMappingURL=FKTextInput.js.map