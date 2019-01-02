import * as React from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationContainerProps } from 'react-navigation';
import HouseAddForm from './houseAddForm'
import { createHouse } from '../../actions/house';
import { navigationOptions } from '../shared/NavigationOptions';

export interface IStateProps {
    saving: boolean,
    error: string,
    message: string,
    house: any
}

export interface IDispatchProps {
    createHouse: (admin: any) => void
}
export interface State {
    inputText: string
}
class HouseAdd extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {
    static navigationOptions = navigationOptions(({ navigation }: any) => (navigation.getParam('id') ? 'Edit House' : 'Add New House'))
    textInput: any;
    state = {
        inputText: ''
    }

    submit = (values: any) => {
        // tslint:disable-next-line:no-shadowed-variable
        const { createHouse, navigation: { goBack } } = this.props
        createHouse(values)
        goBack()
    }

    render() {
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Content>
                <HouseAddForm submit={this.submit as any} saving={this.props.saving} house={this.props.house} />
            </Content>
        </Container>;
    }
}

function mapStateToProps(state: any, ownProps: any): IStateProps {
    return {
        error: state.schoolSignUp.error,
        saving: state.schoolSignUp.saving,
        message: state.schoolSignUp.message,
        house: state.house.houses && state.house.houses.filter((p: any) => p.id === ownProps.navigation.state.params.id)[0]
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        createHouse
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseAdd)