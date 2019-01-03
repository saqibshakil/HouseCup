import * as React from 'react';
import { FieldProps } from 'formik';
import { Item, Label, Text, View, Button } from 'native-base';
import getBorder from '../../utils/addBorder';
import { connect } from 'react-redux';

interface IStateProps {
    houses: [any]
}

class HouseSelectField extends React.Component<FieldProps<any> & IStateProps & { placeholder: string, addRef: (p: any) => void }> {
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
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {props.houses.map((p) =>
                        <View key={p.id} style={{
                            width: '49%', marginVertical: 5, flexDirection: 'column', 
                            borderWidth: field.value === p.id ? 2 : 0, borderColor: 'green'
                        }}>
                            <Button block style={{
                                backgroundColor: p.color, flexDirection: 'column'
                            }} onPress={() => this.onChangeText(p.id)}
                                light>
                                <Text>{field.value === p.id ? '✔ ' : ''}{p.name}</Text>
                            </Button>
                        </View>
                    )}
                </View>
                {errorMsg ? <Text style={{ color: 'red' }}>{errorMsg}</Text> : null}
            </Item>
        );
    }
}

function mapStateToProps(state: any): IStateProps {
    return {
        houses: state.house.houses
    }
}

export default connect(mapStateToProps)(HouseSelectField)