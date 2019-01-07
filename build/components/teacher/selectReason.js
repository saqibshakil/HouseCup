import React, { Component } from 'react';
import { Text } from 'react-native';
import { navigationOptions } from '../shared/NavigationOptions';
import { Button, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
import { categories } from '../shared/CategoryInput';
class ScanStudent extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasCameraPermission: null
        };
        this.gotoAddStudent = () => this.props.navigateTo('AddStudent');
        this.getStyle = (isGood) => ({
            backgroundColor: categories[isGood]
        });
    }
    render() {
        const { reasons } = this.props;
        return (React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Content, null, reasons.map((reason) => React.createElement(Button, { key: reason.id, danger: true, block: true, large: true, onPress: () => this.props.navigateTo('SelectPoint', { reasonId: reason.id }), style: this.getStyle(reason.isGood) },
                React.createElement(Text, null, reason.reason))))));
    }
}
ScanStudent.navigationOptions = navigationOptions('Scan Student');
function mapStateToProps(state) {
    return {
        reasons: state.reason.reasons
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        navigateTo
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ScanStudent);
//# sourceMappingURL=selectReason.js.map