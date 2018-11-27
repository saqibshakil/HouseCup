import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkLogin } from '../actions/base';
class App extends Component {
    render() {
        return (React.createElement(View, { style: styles.container },
            React.createElement(Text, null, "Loading")));
    }
    componentWillReceiveProps(newProps) {
        const prop = this.props;
        prop.navigation.navigate(newProps.navigateTo);
    }
    componentDidMount() {
    }
    componentWillMount() {
        console.log('Loading mounted');
        this.props.checkLogin();
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
function mapStateToProps(state) {
    const { navigateTo } = state.base;
    return {
        navigateTo
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkLogin
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
//# sourceMappingURL=loading.js.map