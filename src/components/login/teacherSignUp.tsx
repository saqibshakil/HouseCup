import * as React from 'react';
import { Spinner } from 'native-base';
import TeacherSignUpForm from './teacherSignUpForm'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationContainerProps } from 'react-navigation';
import { loadTeacherByKeyCode, clearTeacher, updatePasswordAndLogin } from '../../actions/teacher';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import KeyCodePromptForm from './keyCodePromptForm'
import { navigationOptions } from '../shared/NavigationOptions';

export interface IStateProps {

    errorOccured: boolean,
    loading: boolean,
    teacher: any,
}

export interface IDispatchProps {
    loadTeacherByKeyCode: (keyCode: any) => void;
    clearTeacher: () => void
    updatePasswordAndLogin: (user: any) => void
}

export interface State {
    inputText: string
}

class Login extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {
    static navigationOptions = navigationOptions('Signup')

    textInput: any;
    state = {
        inputText: ''
    }

    // tslint:disable-next-line:no-empty
    submit = (user: any) => {
        this.props.updatePasswordAndLogin(user)
    }

    loadTeacher = (values: any) => {
        const keyCode = values.keyCode
        this.props.loadTeacherByKeyCode(keyCode)
    }

    componentDidMount() {
        const keyCode = this.props.navigation.getParam('keyCode')
        if (keyCode)
            this.props.loadTeacherByKeyCode(keyCode)

    }

    componentWillReceiveProps(newProps: IStateProps) {
        if (newProps.errorOccured && this.props.errorOccured !== newProps.errorOccured)
            this.props.navigation.navigate('PreLoginHome')
    }

    componentWillUnmount() {
        this.props.clearTeacher()
    }

    render() {
        return <KeyboardAwareScrollView style={{ flexDirection: 'column', flex: 1 }}>
            {this.showDetail()}
        </KeyboardAwareScrollView>;
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
        clearTeacher,
        updatePasswordAndLogin
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)