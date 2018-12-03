import React, { Component } from 'react';
import { Keyboard, View } from 'react-native';

export default class Example extends Component<{}, { keyboardVisible: boolean, keyboardHeight: number }> {
    keyboardDidShowListener: any
    keyboardDidHideListener: any
    state={
        keyboardVisible: false,
        keyboardHeight: 0
    }
    _keyboardDidShow = (e: any) => {
        console.log("didShow", e)
        this.setState({ keyboardVisible: true, keyboardHeight: e.endCoordinates.height })
    }

    _keyboardDidHide = () => {
        
        this.setState({ keyboardVisible: false })
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
        const { keyboardHeight, keyboardVisible } = this.state
        console.log(keyboardHeight, keyboardVisible)
        return (
            keyboardVisible ? <View style={{ height: keyboardHeight }} /> : null
        );
    }
}