import * as React from 'react';
import { Toast, Title, Body, Container, Header, Content, Left } from 'native-base';
import { Image } from 'react-native'
import AdminSignUpForm from './adminSignUpForm'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAdmin, submit, createTeacher, removeTeacher } from '../../actions/school';
import { NavigationContainerProps } from 'react-navigation';

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
            <Header style={{ flex: 0 }}>
                <Left>
                    <Image style={{ width: 36, height: 36 }} resizeMode='contain' source={require('./../../../assets/cup.png')} />
                </Left>
                <Body>
                    <Title>Admin Signup</Title>
                </Body>
            </Header>
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
