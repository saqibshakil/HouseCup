import * as React from "react";
import { Toast, Title, Body, Container, Header, Content, Footer, Text, View, Left, Spinner } from "native-base";
import { Image, KeyboardAvoidingView } from 'react-native'
import TeacherSignUpForm from './teacherSignUpForm'
import getBorder from "../../utils/addBorder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import colors from '../../native-base-theme/variables/commonColor'
import { NavigationContainerProps, NavigationScreenConfig } from "react-navigation";
import { loadTeacherByKeyCode, clearTeacher } from "../../actions/teacher";
import KeyCodePromptForm from "./keyCodePromptForm";

export interface IStateProps {
    errorOccured: boolean,
    teacher: any,
    loading: boolean
}

export interface IDispatchProps {
    loadTeacherByKeyCode: (keyCode: any) => void;
    clearTeacher: () => void
}

export interface State {
    inputText: string
}

class Login extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {
    textInput: any;
    state = {
        inputText: ''
    }
    static navigationOptions = {
        title: 'Signup',
        headerStyle: { backgroundColor: colors.brandPrimary },
        headerTitleStyle: { color: colors.btnPrimaryColor },
        headerBackTitleStyle: { color: colors.btnPrimaryColor }
    }

    submit = (values: any) => {

    }

    loadTeacher = (values: any) => {
        const keyCode = values.keyCode
        this.props.loadTeacherByKeyCode(keyCode)
    }

    componentDidMount() {
        const keyCode = this.props.navigation.getParam("keyCode")
        if (keyCode)
            this.props.loadTeacherByKeyCode(keyCode)

    }

    componentWillUnmount() {
        this.props.clearTeacher()
    }

    render() {
        return <KeyboardAvoidingView enabled
            style={{ flexDirection: "column", flex: 1, ...getBorder() }}>
            {this.showDetail()}
        </KeyboardAvoidingView>;
    }

    showDetail() {
        const { loading, teacher } = this.props

        if (teacher)
            if (loading)
                return <Spinner />
            else
                if (teacher)
                    return <TeacherSignUpForm submit={this.submit as any} saving={false} teacher={teacher} />
                else
                    return <Spinner />
        else
            return <KeyCodePromptForm submit={this.loadTeacher as any} saving={loading} />

    }

}


function mapStateToProps(state: any): IStateProps {
    return {
        errorOccured: state.teacherSignUp.errorOccured,
        loading: state.teacherSignUp.loading,
        teacher: state.teacherSignUp.teacher
    }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return bindActionCreators({
        loadTeacherByKeyCode,
        clearTeacher
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

