import React, { Component } from 'react';
import { Keyboard, View } from 'react-native';
export default class Example extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            keyboardVisible: false,
            keyboardHeight: 0
        };
        this._keyboardDidShow = (e) => {
            this.setState({ keyboardVisible: true, keyboardHeight: e.endCoordinates.height });
        };
        this._keyboardDidHide = () => {
            this.setState({ keyboardVisible: false });
        };
    }
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    render() {
        const { keyboardHeight, keyboardVisible } = this.state;
        return (
        // tslint:disable-next-line:no-null-keyword
        keyboardVisible ? React.createElement(View, { style: { height: keyboardHeight } }) : null);
    }
}
//# sourceMappingURL=KeyboardPad.js.map