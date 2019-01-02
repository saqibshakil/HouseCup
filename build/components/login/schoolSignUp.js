import * as React from 'react';
import { Container, Content } from 'native-base';
import SchoolSignUpForm from './schoolSignUpForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSchool } from '../../actions/school';
import { navigationOptions } from '../shared/NavigationOptions';
class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.submit = (values) => {
            // tslint:disable-next-line:no-shadowed-variable
            const { createSchool, navigation: { navigate } } = this.props;
            createSchool(values);
            navigate('AdminSignUp', { isAdmin: true });
        };
    }
    render() {
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Content, null,
                React.createElement(SchoolSignUpForm, { submit: this.submit })));
    }
}
Login.navigationOptions = navigationOptions('School SignUp');
function mapStateToProps( /*state: any*/) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createSchool
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//# sourceMappingURL=schoolSignUp.js.map