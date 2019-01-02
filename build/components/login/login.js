import * as React from 'react';
import LoginView from './LoginView';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../actions/login';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.submit = (values) => {
            this.props.login(values.email, values.password);
        };
    }
    render() {
        return React.createElement(KeyboardAwareScrollView, null,
            React.createElement(LoginView, { submit: this.submit, saving: this.props.loading }));
    }
}
Login.navigationOptions = () => ({
    title: 'Sign In'
});
function mapStateToProps(state) {
    return {
        loading: state.login.loading,
        errorOccured: state.login.errorOccured
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        login
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//# sourceMappingURL=login.js.map