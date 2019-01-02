import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { navigationOptions } from '../shared/NavigationOptions';
import { Button } from 'native-base'
import getBorder from '../../utils/addBorder';

interface IState {
    hasCameraPermission: boolean
}

export default class ScanStudent extends Component<{}, IState> {
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
        Alert.alert(
            'Scan successful!',
            JSON.stringify(data)
        );
    };

    render() {
        return (
                this.state.hasCameraPermission === null ?
                    <Text>Requesting for camera permission</Text> :
                    this.state.hasCameraPermission === false ?
                        <Text>Camera permission is not granted</Text> :
                        <BarCodeScanner
                        onBarCodeRead={(scan) => alert(scan.data)}
                        style={[StyleSheet.absoluteFill, styles.container]}
                      >
                        <View style={styles.layerTop} />
                        <View style={styles.layerCenter}>
                          <View style={styles.layerLeft} />
                          <View style={styles.focused} />
                          <View style={styles.layerRight} />
                        </View>
                        <View style={styles.layerBottom} >
                            <Button light style={{ padding: 5 }}><Text>Add Student Manually</Text></Button>
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