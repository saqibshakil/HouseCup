import * as React from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationContainerProps } from 'react-navigation';
import ReasonAddForm from './reasonAddForm'
import { createReason } from '../../actions/reason';
import { navigationOptions } from '../shared/NavigationOptions'
export interface IStateProps {
    saving: boolean,
    error: string,
    message: string,
    reason: any
}

export interface IDispatchProps {
    createReason: (admin: any) => void
}
export interface State {
    inputText: string
}
class ReasonAdd extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {
    static navigationOptions = navigationOptions(({ navigation }: any) => (navigation.getParam('id') ? 'Edit Reason' : 'Add New Reason'))

    textInput: any;

    state = {
        inputText: ''
    }
    submit = (values: any) => {
        // tslint:disable-next-line:no-shadowed-variable
        const { createReason, navigation: { goBack } } = this.props
        createReason(values)
        goBack()
    }

    render() {
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Content>
                <ReasonAddForm submit={this.submit as any} saving={this.props.saving} reason={this.props.reason} />
            </Content>
        </Container>
    }
}

function mapStateToProps(state: any, ownProps: any): IStateProps {
    return {
        error: state.schoolSignUp.error,
        saving: state.schoolSignUp.saving,
        message: state.schoolSignUp.message,
        reason: state.reason.reasons && state.reason.reasons.filter((p: any) => p.id === ownProps.navigation.state.params.id)[0]
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        createReason
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ReasonAdd)