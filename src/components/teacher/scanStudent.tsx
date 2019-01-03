import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { navigationOptions } from '../shared/NavigationOptions';
import { Button } from 'native-base'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
import { createStudent } from '../../actions/home';
import studentSchema from '../../schema/student'

interface IState {
    hasCameraPermission: boolean
}

interface IStateProps {
}

interface IDispatchProps {
    navigateTo: (to: string, params?: any) => void
    createStudent: (student: any) => void
}

class ScanStudent extends Component<IStateProps & IDispatchProps, IState> {
    static navigationOptions = navigationOptions('Scan Student')
    state: IState = {
        hasCameraPermission: null
    };

    componentDidMount() {
        this._requestCameraPermission();
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    };

    _handleBarCodeRead = (data: any) => {
        try {
            const student = JSON.parse(data.data)
            if (!studentSchema.isValidSync(student))
                throw 'Not Complete'
            this.props.createStudent(student)
        } catch (error) {
            console.log(error)
            Alert.alert('QR Code does not belong to a student')
        }
    };

    gotoAddStudent = () => this.props.navigateTo('AddStudent')

    render() {
        return (
            this.state.hasCameraPermission === null ?
                <Text>Requesting for camera permission</Text> :
                this.state.hasCameraPermission === false ?
                    <Text>Camera permission is not granted</Text> :
                    <BarCodeScanner
                        onBarCodeRead={this._handleBarCodeRead}
                        style={[StyleSheet.absoluteFill, styles.container]}
                    >
                        <View style={styles.layerTop} />
                        <View style={styles.layerCenter}>
                            <View style={styles.layerLeft} />
                            <View style={styles.focused} />
                            <View style={styles.layerRight} />
                        </View>
                        <View style={styles.layerBottom} >
                            <Button light style={{ padding: 5, marginTop: 10 }}
                                onPress={this.gotoAddStudent}><Text>Add Student Manually</Text></Button>
                        </View>
                    </BarCodeScanner>

        );
    }
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    layerTop: {
        flex: 1,
        backgroundColor: opacity
    },
    layerCenter: {
        flex: 5,
        flexDirection: 'row'
    },
    layerLeft: {
        flex: 1,
        backgroundColor: opacity
    },
    focused: {
        flex: 10
    },
    layerRight: {
        flex: 1,
        backgroundColor: opacity
    },
    layerBottom: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: opacity,
        justifyContent: 'space-around'
    }
});

function mapStateToProps(): IStateProps {
    return {
    }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return bindActionCreators({
        navigateTo,
        createStudent
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanStudent)