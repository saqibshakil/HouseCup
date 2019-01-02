import * as React from 'react';
import { Container, Content, Text, View, Button, H3, H1 } from 'native-base';
import { connect } from 'react-redux';
import colors from '../../native-base-theme/variables/commonColor';
class Home extends React.Component {
    constructor() {
        super(...arguments);
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
        const { points } = this.props;
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Content, { style: { paddingHorizontal: 10, paddingTop: 10 } },
                React.createElement(Button, { primary: true, block: true, onPress: this.gotoLogin },
                    React.createElement(Text, null, "Award Points")),
                React.createElement(View, { style: { flexDirection: 'row' } }, points.map(p => React.createElement(Button, { block: true, style: { width: '50%', marginVertical: 10, marginRight: 5, flexDirection: 'column' }, light: true, onPress: this.gotoTeacherSignup },
                    React.createElement(H3, null, p.name),
                    React.createElement(H1, null, p.points)))),
                this.props.message && React.createElement(View, null,
                    React.createElement(Text, null, this.props.message))));
    }
}
Home.navigationOptions = {
    headerStyle: { backgroundColor: colors.brandPrimary, height: 0 }
};
function mapStateToProps(state) {
    const points = state.house.houses.map((p) => {
        return {
            id: p.id,
            name: p.name,
            // tslint:disable-next-line:triple-equals
            points: state.home.points.find((x) => x.houseId == p.id)
        };
    });
    return {
        message: state.schoolSignUp.message,
        points
    };
}
export default connect(mapStateToProps)(Home);
//# sourceMappingURL=home.js.map