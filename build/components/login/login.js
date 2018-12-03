import * as React from "react";
import { Title, Body, Container, Header, Content, Footer, Text, View, Left } from "native-base";
import { Image } from 'react-native';
import { RegisterView } from "./LoginView";
class Login extends React.Component {
    constructor() {
        super(...arguments);
        this.navigationOptions = (props) => {
            return {
                // headerBackImage: params.headerBackImage,
                headerTitle: React.createElement(Text, { style: { color: 'black' } }, "Welcome"),
            };
        };
        this.state = {
            inputText: ''
        };
        this.submit = (values) => {
            console.log(values);
        };
    }
    render() {
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Header, { style: { flex: 0 } },
                React.createElement(Left, null,
                    React.createElement(Image, { style: { width: 36, height: 36 }, resizeMode: 'contain', source: require('./../../../assets/cup.png') })),
                React.createElement(Body, null,
                    React.createElement(Title, null, "House Cup Login"))),
            React.createElement(Content, null,
                React.createElement(RegisterView, { submit: this.submit })),
            React.createElement(Footer, { style: { backgroundColor: "#F8F8F8" } },
                React.createElement(View, { style: { alignItems: "center", opacity: 0.5, flexDirection: "row" } },
                    React.createElement(View, { padder: true },
                        React.createElement(Text, { style: { color: "#000" } }, "Made with love at ")),
                    React.createElement(Image, { source: { uri: "https://geekyants.com/images/logo-dark.png" }, style: { width: 422 / 4, height: 86 / 4 } }))));
    }
}
export default Login;
//# sourceMappingURL=login.js.map