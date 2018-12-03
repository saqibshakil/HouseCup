import * as React from "react";
import { Title, Body, Container, Header, Content, Left } from "native-base";
import { Image } from 'react-native';
import AdminSignUpForm from './adminSignUpForm';
import getBorder from "../../utils/addBorder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { removeHouse } from "../../actions/school";
class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.submit = (values) => {
            const { createAdmin, navigation: { navigate } } = this.props;
            createAdmin(values);
            navigate("AdminSignUp");
        };
    }
    render() {
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Header, { style: { flex: 0 } },
                React.createElement(Left, null,
                    React.createElement(Image, { style: { width: 36, height: 36 }, resizeMode: 'contain', source: require('./../../../assets/cup.png') })),
                React.createElement(Body, null,
                    React.createElement(Title, null, "Admin Signup"))),
            React.createElement(Content, { style: getBorder() },
                React.createElement(AdminSignUpForm, { submit: this.submit })));
    }
}
function mapStateToProps(state) {
    return {
        houses: state.schoolSignUp.houses
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeHouse
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//# sourceMappingURL=houseList.js.map