import * as React from 'react';
import { Toast, Title, Body, Container, Header, Content, Footer, Text, View, Left } from 'native-base';
import { Image } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAdmin } from '../../actions/school';
import { NavigationContainerProps } from 'react-navigation';

export interface IStateProps {
}

export interface IDispatchProps {
    createAdmin: (admin: any) => void
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
        const { createAdmin, navigation: { navigate } } = this.props
        createAdmin(values)
        navigate('AdminSignUp')
    }


    render() {
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Content>
                <HouseAddForm  submit={this.submit as any} />
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
        createAdmin
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

