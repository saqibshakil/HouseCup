import * as React from 'react';
import { Container, Content } from 'native-base';
import SchoolSignUpForm from './schoolSignUpForm'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSchool } from '../../actions/school';
import { NavigationContainerProps } from 'react-navigation';
import { navigationOptions } from '../shared/NavigationOptions';

export interface IStateProps {
}

export interface IDispatchProps {
    createSchool: (school: any) => void
}

export interface State {
    inputText: string
}

class Login extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {
    static navigationOptions = navigationOptions('School SignUp')
    textInput: any;
    state = {
        inputText: ''
    }
    submit = (values: any) => {
        // tslint:disable-next-line:no-shadowed-variable
        const { createSchool, navigation: { navigate } } = this.props
        createSchool(values)
        navigate('AdminSignUp', { isAdmin: true })
    }

    render() {
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Content>
                <SchoolSignUpForm submit={this.submit as any} />
            </Content>
        </Container>;
    }
}

function mapStateToProps(/*state: any*/) {

    return {
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        createSchool
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)