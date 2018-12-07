import * as React from 'react';
import { Title, Body, Container, Header, Content, Left } from 'native-base';
import { Image } from 'react-native'
import SchoolSignUpForm from './schoolSignUpForm'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSchool } from '../../actions/school';
import { NavigationContainerProps } from 'react-navigation';

export interface IStateProps {
}

export interface IDispatchProps {
    createSchool: (school: any) => void
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
        const { createSchool, navigation: { navigate } } = this.props
        createSchool(values)
        navigate('AdminSignUp')
    }

    render() {
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Header style={{ flex: 0 }}>
                <Left>
                    <Image style={{ width: 36, height: 36 }} resizeMode='contain' source={require('./../../../assets/cup.png')} />
                </Left>
                <Body>
                    <Title>School Signup</Title>
                </Body>
            </Header>
            <Content>
                <SchoolSignUpForm submit={this.submit as any} />
            </Content>
        </Container>;
    }
}

function mapStateToProps(state: any) {
    return {
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        createSchool
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)