import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-ionicons';
import { back } from '../../actions/base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class BackButton extends React.Component {
    render() {
        return (React.createElement(TouchableOpacity, { onPress: () => this.props.back() },
            React.createElement(IonIcons, { name: 'arrow-round-back', size: 25, style: { marginTop: 0, marginLeft: 20, color: 'white' } })));
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        back
    }, dispatch);
}
export const navigationOptions = (title) => ({ navigation }) => ({
    title: typeof (title) === 'string' ? title : title({ navigation }),
    headerLeft: connect(undefined, mapDispatchToProps)(BackButton)
});
//# sourceMappingURL=NavigationOptions.js.map