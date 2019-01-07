import React, { Component } from 'react';
import { Text } from 'react-native';
import { navigationOptions } from '../shared/NavigationOptions';
import { Button, Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
import { postPoints } from '../../actions/home';
class ScanStudent extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasCameraPermission: null
        };
        this.postPoint = (points) => {
            if (this.props.params)
                this.props.postPoints({ points, reasonId: this.props.params.reasonId });
        };
    }
    render() {
        return (React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Content, null,
                React.createElement(Button, { danger: true, block: true, large: true, onPress: () => this.postPoint(-50), disabled: this.props.saving },
                    React.createElement(Text, null, "-50")),
                React.createElement(Button, { warning: true, block: true, large: true, onPress: () => this.postPoint(-20), disabled: this.props.saving },
                    React.createElement(Text, null, "-20")),
                React.createElement(Button, { light: true, block: true, large: true, onPress: () => this.postPoint(-10), disabled: this.props.saving },
                    React.createElement(Text, null, "-10")),
                React.createElement(Button, { light: true, block: true, large: true, onPress: () => this.postPoint(10), disabled: this.props.saving },
                    React.createElement(Text, null, "10")),
                React.createElement(Button, { info: true, block: true, large: true, onPress: () => this.postPoint(20), disabled: this.props.saving },
                    React.createElement(Text, null, "20")),
                React.createElement(Button, { primary: true, block: true, large: true, onPress: () => this.postPoint(50), disabled: this.props.saving },
                    React.createElement(Text, null, "50")),
                React.createElement(Button, { success: true, block: true, large: true, onPress: () => this.postPoint(100), disabled: this.props.saving },
                    React.createElement(Text, null, "100")))));
    }
}
ScanStudent.navigationOptions = navigationOptions('Select Points');
function mapStateToProps(state) {
    return {
        params: state.base.params,
        saving: state.schoolSignUp.saving
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        navigateTo,
        postPoints
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ScanStudent);
//# sourceMappingURL=pointSelect.js.map