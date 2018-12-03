import * as React from "react";
import { Title, Body, Container, Header, Content, Left } from "native-base";
import { Image } from 'react-native';
import SchoolSignUpForm from './schoolSignUpForm';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createSchool } from "../../actions/school";
class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.submit = (values) => {
            const { createSchool, navigation: { navigate } } = this.props;
            createSchool(values);
            navigate("AdminSignUp");
        };
    }
    render() {
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Header, { style: { flex: 0 } },
                React.createElement(Left, null,
                    React.createElement(Image, { style: { width: 36, height: 36 }, resizeMode: 'contain', source: require('./../../../assets/cup.png') })),
                React.createElement(Body, null,
                    React.createElement(Title, null, "School Signup"))),
            React.createElement(Content, null,
                React.createElement(SchoolSignUpForm, { submit: this.submit })));
    }
}
function mapStateToProps(state) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createSchool
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//# sourceMappingURL=schoolSignUp.js.map