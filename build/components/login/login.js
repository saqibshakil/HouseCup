import * as React from 'react';
import LoginView from './LoginView';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../actions/login';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.navigationOptions = (props) => {
            return {
                headerTitle: 'House Cup Login'
            };
        };
        this.submit = (values) => {
            this.props.login(values.email, values.password);
        };
    }
    componentWillReceiveProps(newProps) {
        // if (newProps.errorOccured === false && newProps.loading === false && newProps.loading !== this.props.loading)
        //    this.props.navigation.navigate({ routeName: 'Teacher' })
    }
    render() {
        return React.createElement(KeyboardAwareScrollView, null,
            React.createElement(LoginView, { submit: this.submit, saving: this.props.loading }));
    }
}
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