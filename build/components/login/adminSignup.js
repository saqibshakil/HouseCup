import * as React from "react";
import { Toast, Title, Body, Container, Header, Content, Left } from "native-base";
import { Image } from 'react-native';
import AdminSignUpForm from './adminSignUpForm';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createAdmin, submit } from "../../actions/school";
class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.submit = (values) => {
            const { createAdmin, submit, navigation: { navigate } } = this.props;
            createAdmin(values);
            submit();
        };
    }
    componentWillReceiveProps(newProps) {
        const { navigation: { popToTop } } = this.props;
        if (newProps.error && newProps.error !== this.props.error)
            Toast.show({
                text: newProps.error,
                type: 'danger'
            });
        if (newProps.message && newProps.message !== this.props.message) {
            popToTop();
        }
    }
    render() {
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Header, { style: { flex: 0 } },
                React.createElement(Left, null,
                    React.createElement(Image, { style: { width: 36, height: 36 }, resizeMode: 'contain', source: require('./../../../assets/cup.png') })),
                React.createElement(Body, null,
                    React.createElement(Title, null, "Admin Signup"))),
            React.createElement(Content, null,
                React.createElement(AdminSignUpForm, { submit: this.submit, saving: this.props.saving })));
    }
}
function mapStateToProps(state) {
    return {
        error: state.schoolSignUp.error,
        saving: state.schoolSignUp.saving,
        message: state.schoolSignUp.message
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createAdmin,
        submit
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//# sourceMappingURL=adminSignup.js.map