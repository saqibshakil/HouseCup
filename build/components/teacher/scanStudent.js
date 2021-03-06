var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { navigationOptions } from '../shared/NavigationOptions';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
import { createStudent, selectStudent, scanFailed } from '../../actions/home';
import studentSchema from '../../schema/student';
class ScanStudent extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasCameraPermission: null,
            scanning: false
        };
        this._requestCameraPermission = () => __awaiter(this, void 0, void 0, function* () {
            const { status } = yield Permissions.askAsync(Permissions.CAMERA);
            this.setState({
                hasCameraPermission: status === 'granted'
            });
        });
        this._handleBarCodeRead = ({ data }) => {
            if (!this.state.scanning) {
                try {
                    this.setState({ scanning: true });
                    const student = JSON.parse(data);
                    if (!studentSchema.isValidSync(student))
                        throw 'Not Complete';
                    this.props.createStudent(student);
                }
                catch (error) {
                    if (data)
                        this.props.selectStudent({ grNo: data });
                }
            }
        };
        this.gotoAddStudent = () => this.props.navigateTo('AddStudent');
    }
    componentDidUpdate() {
        if (this.state.scanning === true && this.props.scanFailedStatus) {
            this.setState({ scanning: false });
            this.props.scanFailed(false);
        }
    }
    componentDidMount() {
        this._requestCameraPermission();
    }
    render() {
        return (this.state.hasCameraPermission === null ?
            React.createElement(Text, null, "Requesting for camera permission") :
            this.state.hasCameraPermission === false ?
                React.createElement(Text, null, "Camera permission is not granted") :
                !this.state.scanning ? React.createElement(BarCodeScanner, { onBarCodeScanned: this._handleBarCodeRead, barCodeScannerSettings: {
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                    }, style: [StyleSheet.absoluteFill, styles.container] },
                    React.createElement(View, { style: styles.layerTop }),
                    React.createElement(View, { style: styles.layerCenter },
                        React.createElement(View, { style: styles.layerLeft }),
                        React.createElement(View, { style: styles.focused }),
                        React.createElement(View, { style: styles.layerRight })),
                    React.createElement(View, { style: styles.layerBottom },
                        React.createElement(Button, { light: true, style: { padding: 5, marginTop: 10 }, onPress: this.gotoAddStudent },
                            React.createElement(Text, null, "Add Student Manually")))) : React.createElement(Text, null, "Scanning Barcode"));
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
function mapStateToProps(state) {
    return {
        scanFailedStatus: state.home.scanFailed
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        navigateTo,
        createStudent,
        selectStudent,
        scanFailed
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ScanStudent);
//# sourceMappingURL=scanStudent.js.map