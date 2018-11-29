import * as React from "react";
import { Toast, Title, Body, Container, Header, Content, Footer, Text, View, Left } from "native-base";
import { Image } from 'react-native'
import AdminSignUpForm from './adminSignUpForm'
import getBorder from "../../utils/addBorder";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createAdmin, submit } from "../../actions/school";
import { NavigationContainerProps } from "react-navigation";

export interface IStateProps {
    saving: boolean,
    error: string,
    message: string
}

export interface IDispatchProps {
    createAdmin: (admin: any) => void;
    submit: ()=>void
}
export interface State {
    inputText: string
}
class Login extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {
    textInput: any;
    state = {
        inputText: ''
    }
    submit = (values: any) => {
        const { createAdmin, submit , navigation: { navigate } } = this.props
        createAdmin(values)
        submit()
    }

    componentWillReceiveProps(newProps: IStateProps){
        const {  navigation: { popToTop } } = this.props
        
        if(newProps.error && newProps.error !== this.props.error)
            Toast.show({
                text: newProps.error,
                type: 'danger'
            })

            if(newProps.message && newProps.message !== this.props.message){
                popToTop()
            }
    }

    render() {
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Header style={{ flex:0 }}>
                <Left>
                    <Image style={{ width: 36, height: 36 }} resizeMode='contain' source={require('./../../../assets/cup.png')} />
                </Left>
                <Body>
                    <Title>Admin Signup</Title>
                </Body>
            </Header>
            <Content style={getBorder()}>
                <AdminSignUpForm  submit={this.submit as any} saving={this.props.saving} />
            </Content>
        </Container>;
    }
}


function mapStateToProps(state: any) {
    return {
        error: state.schoolSignUp.error,
        saving: state.schoolSignUp.saving,
        message: state.schoolSignUp.message
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        createAdmin,
        submit
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

