import * as React from 'react';
import { Toast, Container, Content } from 'native-base';
import AdminSignUpForm from './adminSignUpForm'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAdmin, submit, createTeacher, removeTeacher } from '../../actions/school';
import { NavigationContainerProps } from 'react-navigation';
import { navigationOptions } from '../shared/NavigationOptions'
export interface IStateProps {
    saving: boolean,
    error: string,
    message: string,
    teacher: any
}

export interface IDispatchProps {
    createAdmin: (admin: any) => void;
    createTeacher: (admin: any) => void;
    submit: () => void,
    removeTeacher: (id: string) => void
}
export interface State {
    inputText: string
}
class AdminSignUp extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {

    static navigationOptions = navigationOptions(({ navigation }: any) => navigation.getParam('id')
        ? 'Edit ' + (navigation.getParam('isAdmin') ? 'Admin' : 'Teacher')
        : 'Add New ' + (navigation.getParam('isAdmin') ? 'Admin' : 'Teacher'))
    textInput: any;
    state = {
        inputText: ''
    }

    submit = (values: any) => {
        // tslint:disable-next-line:no-shadowed-variable
        const { createAdmin, createTeacher, navigation: { state: { params } } } = this.props
        if (params && params.isAdmin && !params.id) {
            createAdmin(values)
            this.props.submit()
        } else {
            createTeacher(values)
        }
    }

    componentWillReceiveProps(newProps: IStateProps) {
        const { navigation: { popToTop } } = this.props

        if (newProps.error && newProps.error !== this.props.error)
            Toast.show({
                text: newProps.error,
                type: 'danger'
            })

        if (newProps.message && newProps.message !== this.props.message) {
            popToTop()
        }
    }

    render() {
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Content>
                <AdminSignUpForm submit={this.submit as any} saving={this.props.saving} teacher={this.props.teacher} />
            </Content>
        </Container>;
    }
}

function mapStateToProps(state: any, ownProps: NavigationContainerProps) {
    return {
        error: state.schoolSignUp.error,
        saving: state.schoolSignUp.saving,
        message: state.schoolSignUp.message,
        teacher: state.teacher.teachers && state.teacher.teachers.filter((p: any) => p.id === ownProps.navigation.state.params.id)[0]
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        createAdmin,
        submit,
        createTeacher,
        removeTeacher
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminSignUp)