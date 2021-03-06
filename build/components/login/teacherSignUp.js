import * as React from 'react';
import { Spinner } from 'native-base';
import TeacherSignUpForm from './teacherSignUpForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadTeacherByKeyCode, clearTeacher, updatePasswordAndLogin } from '../../actions/teacher';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import KeyCodePromptForm from './keyCodePromptForm';
import { navigationOptions } from '../shared/NavigationOptions';
class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        // tslint:disable-next-line:no-empty
        this.submit = (user) => {
            this.props.updatePasswordAndLogin(user);
        };
        this.loadTeacher = (values) => {
            const keyCode = values.keyCode;
            this.props.loadTeacherByKeyCode(keyCode);
        };
    }
    componentDidMount() {
        const keyCode = this.props.navigation.getParam('keyCode');
        if (keyCode)
            this.props.loadTeacherByKeyCode(keyCode);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.errorOccured && this.props.errorOccured !== newProps.errorOccured)
            this.props.navigation.navigate('PreLoginHome');
    }
    componentWillUnmount() {
        this.props.clearTeacher();
    }
    render() {
        return React.createElement(KeyboardAwareScrollView, { style: { flexDirection: 'column', flex: 1 } }, this.showDetail());
    }
    showDetail() {
        const { loading, teacher } = this.props;
        if (teacher)
            if (loading)
                return React.createElement(Spinner, null);
            else if (teacher)
                return React.createElement(TeacherSignUpForm, { submit: this.submit, saving: false, teacher: teacher });
            else
                return React.createElement(Spinner, null);
        else
            return React.createElement(KeyCodePromptForm, { submit: this.loadTeacher, saving: loading });
    }
}
Login.navigationOptions = navigationOptions('Signup');
function mapStateToProps(state) {
    return {
        errorOccured: state.teacherSignUp.errorOccured,
        loading: state.teacherSignUp.loading,
        teacher: state.teacherSignUp.teacher
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loadTeacherByKeyCode,
        clearTeacher,
        updatePasswordAndLogin
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//# sourceMappingURL=teacherSignUp.js.map