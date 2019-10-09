import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions'
import { Audio } from 'expo-av'
import { navigationOptions } from '../shared/NavigationOptions';
import { Button, Spinner } from 'native-base'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
import { createStudent, selectStudent, scanFailed } from '../../actions/home';
import studentSchema from '../../schema/student'

interface IState {
    hasCameraPermission: boolean,
    scanning: boolean,
    sound: any
}

interface IStateProps {
    scanFailedStatus: boolean,
    navigatedAway: boolean
}

interface IDispatchProps {
    navigateTo: (to: string, params?: any) => void
    createStudent: (student: any) => void
    selectStudent: (student: any) => any
    scanFailed: (register: boolean) => void
}

class ScanStudent extends Component<IStateProps & IDispatchProps, IState> {
    static navigationOptions = navigationOptions('Scan Student')
    state: IState = {
        hasCameraPermission: null,
        scanning: false,
        sound: undefined
    };

    componentDidUpdate(prevProps: IStateProps) {
        if (this.state.scanning === true && this.props.scanFailedStatus) {
            const soundObject = new Audio.Sound();
            try {
                soundObject.loadAsync(require('./../../../assets/beep.mp3'));

                // Your sound is playing!
            } catch (error) {
                // An error occurred!
            }

            this.setState({ scanning: false, sound: soundObject })

            this.props.scanFailed(false)
        }

        if (this.props.navigatedAway && !prevProps.navigatedAway) {
            const sound = new Audio.Sound();
            this.setState({ scanning: false, sound })
            try {
                sound.loadAsync(require('./../../../assets/beep.mp3'));

                // Your sound is playing!
            } catch (error) {
                // An error occurred!
            }
            
        }

    }
    componentDidMount() {
        this._requestCameraPermission();
        const soundObject = new Audio.Sound();
        this.setState({ sound: soundObject })
        try {
            soundObject.loadAsync(require('./../../../assets/beep.mp3'));

            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    }

    _requestCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermission: status === 'granted'
        });
    };

    _handleBarCodeRead = ({ data }: any) => {
        if (!this.state.scanning) {
            try {
                this.setState({ scanning: true })
                const student = JSON.parse(data)
                if (!studentSchema.isValidSync(student))
                    throw 'Not Complete'
                this.props.createStudent(student)
                this.state.sound.playAsync()
            } catch (error) {
                if (data && (typeof data === 'number' || typeof data === 'string')) {
                    this.props.selectStudent({ grNo: data })
                    this.state.sound.playAsync()
                }
            }
        }
    };

    gotoAddStudent = () => {
        this.props.navigateTo('AddStudent')
    }
    simulateScan = () => this._handleBarCodeRead({ data: 'T001' })
    render() {
        return (
            this.state.hasCameraPermission === null ?
                <Text>Requesting for camera permission</Text> :
                this.state.hasCameraPermission === false ?
                    <Text>Camera permission is not granted</Text> :
                    !this.state.scanning ? <BarCodeScanner
                        onBarCodeScanned={this._handleBarCodeRead}
                        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
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
                            {
                                __DEV__ ? <Button light style={{ padding: 5, marginTop: 10 }}
                                    onPress={this.simulateScan}><Text>Simulate Scan</Text></Button> : undefined

                            }
                        </View>
                    </BarCodeScanner> : <Spinner color='gray' />

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

function mapStateToProps(state): IStateProps {
    return {
        scanFailedStatus: state.home.scanFailed,
        navigatedAway: state.base.navigateTo !== 'ScanStudent'
    }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return bindActionCreators({
        navigateTo,
        createStudent,
        selectStudent,
        scanFailed
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ScanStudent)