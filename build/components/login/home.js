import * as React from 'react';
import { Body, Container, Header, Content, Text, View, Button } from 'native-base';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import colors from '../../native-base-theme/variables/commonColor';
class Home extends React.Component {
    constructor() {
        super(...arguments);
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
                React.createElement(Body, { style: { alignItems: 'center' } },
                    React.createElement(View, { padder: true },
                        React.createElement(Text, { style: { color: Platform.OS === 'ios' ? '#000' : '#FFF' } })),
                    React.createElement(Image, { style: { width: 200, height: 150 }, resizeMode: 'contain', source: require('./../../../assets/cup.png') }),
                    React.createElement(View, { padder: true },
                        React.createElement(Text, { style: { color: Platform.OS === 'ios' ? '#000' : '#FFF' } })))),
            React.createElement(Content, { style: { paddingHorizontal: 10, paddingTop: 10 } },
                React.createElement(Button, { primary: true, block: true, onPress: this.gotoLogin },
                    React.createElement(Text, null, "Sign In")),
                React.createElement(View, { style: { flexDirection: 'row' } },
                    React.createElement(Button, { block: true, style: { flex: 1, marginVertical: 10, marginRight: 5 }, light: true, onPress: this.gotoTeacherSignup },
                        React.createElement(Text, null, "Teacher Signup")),
                    React.createElement(Button, { block: true, style: { flex: 1, marginVertical: 10, marginLeft: 5 }, light: true, onPress: this.gotoSchoolSignup },
                        React.createElement(Text, null, "School Signup"))),
                this.props.message && React.createElement(View, null,
                    React.createElement(Text, null, this.props.message))));
    }
}
Home.navigationOptions = {
    headerStyle: { backgroundColor: colors.brandPrimary, height: 0 }
};
function mapStateToProps(state) {
    return {
        message: state.schoolSignUp.message
    };
}
export default connect(mapStateToProps)(Home);
//# sourceMappingURL=home.js.map