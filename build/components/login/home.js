import * as React from "react";
import { Title, Body, Container, Header, Content, Footer, Text, View, Button } from "native-base";
import { Image, Platform } from 'react-native';
import { connect } from "react-redux";
class Home extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.submit = (values) => {
            console.log(values);
        };
        this.gotoLogin = () => {
            const { navigation: { navigate } } = this.props;
            navigate({ routeName: 'Login' });
        };
        this.gotoSchoolSignup = () => {
            const { navigation: { navigate } } = this.props;
            navigate({ routeName: 'SchoolSignUp' });
        };
        this.gotoTeacherSignup = () => {
            const { navigation: { navigate } } = this.props;
            navigate({
                routeName: 'TeacherSignUp'
            });
        };
    }
    render() {
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Header, { style: { height: 250 } },
                React.createElement(Body, { style: { alignItems: "center" } },
                    React.createElement(View, { padder: true },
                        React.createElement(Text, { style: { color: Platform.OS === "ios" ? "#000" : "#FFF" } })),
                    React.createElement(Image, { style: { width: 200, height: 150 }, resizeMode: 'contain', source: require('./../../../assets/cup.png') }),
                    React.createElement(Title, null, "House Cup"),
                    React.createElement(View, { padder: true },
                        React.createElement(Text, { style: { color: Platform.OS === "ios" ? "#000" : "#FFF" } })))),
            React.createElement(Content, { style: { paddingHorizontal: 10, paddingTop: 10 } },
                React.createElement(Button, { primary: true, block: true, onPress: this.gotoLogin },
                    React.createElement(Text, null, "Sign In")),
                React.createElement(View, { style: { flexDirection: 'row' } },
                    React.createElement(Button, { block: true, style: { flex: 1, marginVertical: 10, marginRight: 5 }, light: true, onPress: this.gotoTeacherSignup },
                        React.createElement(Text, null, "Teacher Signup")),
                    React.createElement(Button, { block: true, style: { flex: 1, marginVertical: 10, marginLeft: 5 }, light: true, onPress: this.gotoSchoolSignup },
                        React.createElement(Text, null, "School Signup"))),
                this.props.message && React.createElement(View, null,
                    React.createElement(Text, null, this.props.message))),
            React.createElement(Footer, { style: { backgroundColor: "#F8F8F8" } },
                React.createElement(View, { style: { alignItems: "center", opacity: 0.5, flexDirection: "row" } },
                    React.createElement(View, { padder: true },
                        React.createElement(Text, { style: { color: "#000" } }, "Made with love at ")),
                    React.createElement(Image, { source: { uri: "https://geekyants.com/images/logo-dark.png" }, style: { width: 422 / 4, height: 86 / 4 } }))));
    }
}
function mapStateToProps(state) {
    return {
        message: state.schoolSignUp.message
    };
}
export default connect(mapStateToProps)(Home);
//# sourceMappingURL=home.js.map