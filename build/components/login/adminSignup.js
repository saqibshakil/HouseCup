import * as React from 'react';
import { Toast, Container, Content } from 'native-base';
import AdminSignUpForm from './adminSignUpForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAdmin, submit, createTeacher, removeTeacher } from '../../actions/school';
class AdminSignUp extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.submit = (values) => {
            // tslint:disable-next-line:no-shadowed-variable
            const { createAdmin, createTeacher, navigation: { state: { params } } } = this.props;
            if (params && params.isAdmin && !params.id) {
                createAdmin(values);
                this.props.submit();
            }
            else {
                createTeacher(values);
            }
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
            React.createElement(Content, null,
                React.createElement(AdminSignUpForm, { submit: this.submit, saving: this.props.saving, teacher: this.props.teacher })));
    }
}
AdminSignUp.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('id')
        ? 'Edit ' + (navigation.getParam('isAdmin') ? 'Admin' : 'Teacher')
        : 'Add New ' + (navigation.getParam('isAdmin') ? 'Admin' : 'Teacher')
});
function mapStateToProps(state, ownProps) {
    return {
        error: state.schoolSignUp.error,
        saving: state.schoolSignUp.saving,
        message: state.schoolSignUp.message,
        teacher: state.teacher.teachers && state.teacher.teachers.filter((p) => p.id === ownProps.navigation.state.params.id)[0]
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createAdmin,
        submit,
        createTeacher,
        removeTeacher
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminSignUp);
//# sourceMappingURL=adminSignup.js.map