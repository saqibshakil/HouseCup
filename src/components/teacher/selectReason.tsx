import React, { Component } from 'react';
import { Text, ViewStyle } from 'react-native';
import { navigationOptions } from '../shared/NavigationOptions';
import { Button, Container, Content } from 'native-base'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
import { categories } from '../shared/CategoryInput'
interface IState {
}

interface IStateProps {
    reasons: any
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
        const { reasons } = this.props
        return (
            <Container style={{ flex: 1, alignSelf: 'stretch' }}>
                <Content>
                    {reasons.map((reason: any) =>
                        <Button key={reason.id} danger block large onPress={() => this.props.navigateTo('SelectPoint', { reasonId: reason.id })}
                            style={this.getStyle(reason.isGood)}>
                            <Text>{reason.reason}</Text>
                        </Button>
                    )}
                </Content>
            </Container>
        );
    }

    getStyle = (isGood: number): ViewStyle => ({
        backgroundColor: categories[isGood]
    })
}

function mapStateToProps(state: any): IStateProps {
    return {
        reasons: state.reason.reasons
    }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return bindActionCreators({
        navigateTo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanStudent)