import * as React from "react";
import { Spinner } from "native-base";
import { KeyboardAvoidingView } from 'react-native';
import TeacherSignUpForm from './teacherSignUpForm';
import getBorder from "../../utils/addBorder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import colors from '../../native-base-theme/variables/commonColor';
import { loadTeacherByKeyCode, clearTeacher } from "../../actions/teacher";
import KeyCodePromptForm from "./keyCodePromptForm";
class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.submit = (values) => {
        };
        this.loadTeacher = (values) => {
            const keyCode = values.keyCode;
            this.props.loadTeacherByKeyCode(keyCode);
        };
    }
    componentDidMount() {
        const keyCode = this.props.navigation.getParam("keyCode");
        if (keyCode)
            this.props.loadTeacherByKeyCode(keyCode);
    }
    componentWillUnmount() {
        this.props.clearTeacher();
    }
    render() {
        return React.createElement(KeyboardAvoidingView, { enabled: true, style: Object.assign({ flexDirection: "column", flex: 1 }, getBorder()) }, this.showDetail());
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
Login.navigationOptions = {
    title: 'Signup',
    headerStyle: { backgroundColor: colors.brandPrimary },
    headerTitleStyle: { color: colors.btnPrimaryColor },
    headerBackTitleStyle: { color: colors.btnPrimaryColor }
};
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
        clearTeacher
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
//# sourceMappingURL=teacherSignUp.js.map