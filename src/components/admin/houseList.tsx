import * as React from 'react';
import { Toast, Title, Body, Container, Header, Content, Footer, Text, View, Left } from 'native-base';
import getBorder from '../../utils/addBorder';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAdmin as createAdminAction, removeHouse } from '../../actions/school';
import { NavigationContainerProps } from 'react-navigation';

export interface IStateProps {
    houses: []
}

export interface IDispatchProps {
    createAdmin: (admin: any) => void
}
export interface State {
    inputText: string
}
class HouseList extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {
    textInput: any;
    state = {
        inputText: ''
    }
    submit = (values: any) => {
        const { createAdmin, navigation: { navigate } } = this.props
    }

    render() {
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Header style={{ flex: 0 }}>
                <Body>
                    <Title>House Setup</Title>
                </Body>
            </Header>
            <Content style={getBorder()}>
                <AdminSignUpForm submit={this.submit as any} />
            </Content>
        </Container>;
    }
}

function mapStateToProps(state: any): IStateProps {
    return {
        houses: state.house.houses
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        removeHouse
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseList)