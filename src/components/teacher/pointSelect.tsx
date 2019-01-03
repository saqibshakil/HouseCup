import React, { Component } from 'react';
import { Text  } from 'react-native';
import { navigationOptions } from '../shared/NavigationOptions';
import { Button, Container, Content } from 'native-base'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';

interface IState {
}

interface IStateProps {
}

interface IDispatchProps {
    navigateTo: (to: string, params?: any) => void
}

class ScanStudent extends Component<IStateProps & IDispatchProps, IState> {
    static navigationOptions = navigationOptions('Scan Student')
    state: IState = {
        hasCameraPermission: null
    };

    gotoAddStudent = () => this.props.navigateTo('AddStudent')

    render() {
        return (
            <Container style={{ flex: 1, alignSelf: 'stretch' }}>
                <Content>
                    <Button danger block large onPress={() => this.props.navigateTo('SelectReason', { points: -50 })}><Text>-50</Text></Button>
                    <Button warning block large onPress={() => this.props.navigateTo('SelectReason', { points: -20 })}><Text>-20</Text></Button>
                    <Button light block large onPress={() => this.props.navigateTo('SelectReason', { points: -10 })}><Text>-10</Text></Button>
                    <Button light block large onPress={() => this.props.navigateTo('SelectReason', { points: 10 })}><Text>10</Text></Button>
                    <Button info block large onPress={() => this.props.navigateTo('SelectReason', { points: 20 })}><Text>20</Text></Button>
                    <Button primary block large onPress={() => this.props.navigateTo('SelectReason', { points: 50 })}><Text>50</Text></Button>
                    <Button success block large onPress={() => this.props.navigateTo('SelectReason', { points: 100 })}><Text>100</Text></Button>
                </Content>
            </Container>
        );
    }
}

function mapStateToProps(): IStateProps {
    return {
    }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return bindActionCreators({
        navigateTo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanStudent)