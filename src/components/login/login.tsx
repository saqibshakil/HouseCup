import * as React from 'react';
import LoginView from './LoginView';
import { NavigationContainerProps } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../../actions/login';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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

    submit = (values: any) => {
        this.props.login(values.email, values.password)
    }

    componentWillReceiveProps(newProps: IStateProps) {
        // if (newProps.errorOccured === false && newProps.loading === false && newProps.loading !== this.props.loading)
        //    this.props.navigation.navigate({ routeName: 'Teacher' })
    }

    render() {
        return <KeyboardAwareScrollView>
            <LoginView submit={this.submit as any} saving={this.props.loading} />
        </KeyboardAwareScrollView>;
    }
}

function mapStateToProps(state: any): IStateProps {
    return {
        loading: state.login.loading,
        errorOccured: state.login.errorOccured
    }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return bindActionCreators({
        login
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)