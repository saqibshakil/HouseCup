import * as React from 'react'
import { TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-ionicons'
import { back } from '../../actions/base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export interface IDispatchProps {
    back: () => void
}

class BackButton extends React.Component<IDispatchProps, {}> {
    render() {
        return (
            <TouchableOpacity onPress={() => this.props.back()}>
                <IonIcons name='arrow-round-back' size={25} style={{ marginTop: 0, marginLeft: 20, color: 'white' }} />
            </TouchableOpacity>
        );
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        back
    }, dispatch)
}

export const navigationOptions = (title: string | (({ navigation }: any) => string)) => ({ navigation }: any) => ({
    title: typeof (title) === 'string' ? title : title({ navigation }),
    headerLeft: connect(undefined, mapDispatchToProps)(BackButton)

})