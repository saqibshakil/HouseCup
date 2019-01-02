var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { navigationOptions } from '../shared/NavigationOptions';
import { Button } from 'native-base';
export default class ScanStudent extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasCameraPermission: null
        };
        this._requestCameraPermission = () => __awaiter(this, void 0, void 0, function* () {
            const { status } = yield Permissions.askAsync(Permissions.CAMERA);
            this.setState({
                hasCameraPermission: status === 'granted'
            });
        });
        this._handleBarCodeRead = (data) => {
            Alert.alert('Scan successful!', JSON.stringify(data));
        };
    }
    componentDidMount() {
        this._requestCameraPermission();
    }
    render() {
        return (this.state.hasCameraPermission === null ?
            React.createElement(Text, null, "Requesting for camera permission") :
            this.state.hasCameraPermission === false ?
                React.createElement(Text, null, "Camera permission is not granted") :
                React.createElement(BarCodeScanner, { onBarCodeRead: (scan) => alert(scan.data), style: [StyleSheet.absoluteFill, styles.container] },
                    React.createElement(View, { style: styles.layerTop }),
                    React.createElement(View, { style: styles.layerCenter },
                        React.createElement(View, { style: styles.layerLeft }),
                        React.createElement(View, { style: styles.focused }),
                        React.createElement(View, { style: styles.layerRight })),
                    React.createElement(View, { style: styles.layerBottom },
                        React.createElement(Button, { light: true, style: { padding: 5 } },
                            React.createElement(Text, null, "Add Student Manually")))));
    }
}
ScanStudent.navigationOptions = navigationOptions('Scan Student');
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
//# sourceMappingURL=scanStudent.js.map