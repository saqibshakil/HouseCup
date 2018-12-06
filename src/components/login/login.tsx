import * as React from "react";
import { Toast, Title, Body, Container, Header, Content, Footer, Text, View, Left } from "native-base";
import { Image } from 'react-native'
import { RegisterView } from "./LoginView";
import getBorder from "../../utils/addBorder";
import { NavigationContainerProps } from "react-navigation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { login } from "../../actions/login";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import loading from "../../screens/loading";

export interface IStateProps {
    loading: boolean;
    errorOccured: boolean;
}

export interface IDispatchProps {
    login: (email: string, password: string) => void
}

export interface State {
}

class Login extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {
    navigationOptions = (props: NavigationContainerProps) => {
        return {
            headerTitle: 'House Cup Login'
        };
    };
    textInput: any;

    submit = (values: any) => {
        this.props.login(values.email, values.password)
    }

    componentWillReceiveProps(newProps: IStateProps) {
        if (newProps.errorOccured === false && newProps.loading === false && newProps.loading !== this.props.loading)
            this.props.navigation.navigate({ routeName: 'Teacher' })
    }

    render() {
        return <KeyboardAwareScrollView>
            <RegisterView submit={this.submit as any} />
        </KeyboardAwareScrollView>;
    }
}


function mapStateToProps(state: any): IStateProps {
    return {
        loading: state.login.loading,
        errorOccured: state.login.errorOccurred
    }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return bindActionCreators({
        login
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)