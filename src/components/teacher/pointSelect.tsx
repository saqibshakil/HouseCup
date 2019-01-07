import React, { Component } from 'react';
import { Text } from 'react-native';
import { navigationOptions } from '../shared/NavigationOptions';
import { Button, Container, Content } from 'native-base'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
import { postPoints } from '../../actions/home';

interface IState {
}

interface IStateProps {
    params: any
    saving: boolean
}

interface IDispatchProps {
    postPoints: (obj: { points: number, reasonId: any }) => void
    navigateTo: (to: string, params?: any) => void
}

class ScanStudent extends Component<IStateProps & IDispatchProps, IState> {
    static navigationOptions = navigationOptions('Select Points')
    state: IState = {
        hasCameraPermission: null
    };

    render() {
        return (
            <Container style={{ flex: 1, alignSelf: 'stretch' }}>
                <Content>
                    <Button danger block large onPress={() => this.postPoint(-50)} disabled={this.props.saving}><Text>-50</Text></Button>
                    <Button warning block large onPress={() => this.postPoint(-20)} disabled={this.props.saving}><Text>-20</Text></Button>
                    <Button light block large onPress={() => this.postPoint(-10)} disabled={this.props.saving}><Text>-10</Text></Button>
                    <Button light block large onPress={() => this.postPoint(10)} disabled={this.props.saving}><Text>10</Text></Button>
                    <Button info block large onPress={() => this.postPoint(20)} disabled={this.props.saving}><Text>20</Text></Button>
                    <Button primary block large onPress={() => this.postPoint(50)} disabled={this.props.saving}><Text>50</Text></Button>
                    <Button success block large onPress={() => this.postPoint(100)} disabled={this.props.saving}><Text>100</Text></Button>
                </Content>
            </Container>
        );
    }

    postPoint = (points: number) => {
        if (this.props.params)
            this.props.postPoints({ points, reasonId: this.props.params.reasonId })
    }
}

function mapStateToProps(state: any): IStateProps {
    return {
        params: state.base.params,
        saving: state.schoolSignUp.saving
    }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return bindActionCreators({
        navigateTo,
        postPoints
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanStudent)