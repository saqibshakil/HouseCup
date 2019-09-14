import * as React from 'react';
import { Container, Content, Text, View, Button, H3, H1, Header, Body, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import colors from '../../native-base-theme/variables/commonColor';
import { Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
import { logout } from '../../actions/login';
class Home extends React.Component {
    constructor() {
        super(...arguments);
        this.gotoScan = () => {
            this.props.navigateTo('ScanStudent');
        };
        this.logout = () => {
            const { saving } = this.props;
            if (!saving)
                this.props.logout();
        };
    }
    render() {
        const { points } = this.props;
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Header, null,
                React.createElement(Left, { style: { flex: 0 } },
                    React.createElement(Image, { resizeMode: 'contain', style: { width: 38, height: 38 }, source: require('./../../../assets/icon.png') })),
                React.createElement(Body, { style: { alignItems: 'center' } },
                    React.createElement(Text, { style: { color: 'white' } }, "House Cup")),
                React.createElement(Right, null,
                    React.createElement(Button, { danger: true, onPress: this.logout, small: true },
                        React.createElement(Text, null, "Logout")))),
            React.createElement(Content, { style: { paddingHorizontal: 10, paddingTop: 10 } },
                this.props.setupIncomplete ?
                    React.createElement(Text, { style: { color: 'red' } }, "School setup incomplete please advise school admin to add the respective houses and reasons")
                    : React.createElement(Button, { primary: true, block: true, onPress: this.gotoScan },
                        React.createElement(Text, null, "Award Points")),
                React.createElement(View, { style: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' } }, points.map((p) => React.createElement(View, { key: p.id, style: {
                        width: '49%', marginVertical: 5, flexDirection: 'column'
                    } },
                    React.createElement(Button, { block: true, style: {
                            height: 100, backgroundColor: p.color, flexDirection: 'column'
                        }, light: true },
                        React.createElement(H3, null, p.name),
                        React.createElement(H1, null, p.points)))))));
    }
}
Home.navigationOptions = {
    headerStyle: { backgroundColor: colors.brandPrimary, height: 0 }
};
function mapStateToProps(state) {
    const points = state.house.houses.map((p) => {
        // tslint:disable-next-line:triple-equals
        const housePoints = state.home.points.find((x) => x.houseId == p.id);
        return {
            id: p.id,
            name: p.name,
            color: p.color,
            // tslint:disable-next-line:triple-equals
            points: housePoints === undefined ? 0 : housePoints.Points
        };
    });
    return {
        message: state.schoolSignUp.message,
        points,
        saving: state.schoolSignUp.saving,
        setupIncomplete: !(state.house.houses.length > 1 && state.reason.reasons.length > 0)
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        navigateTo,
        logout
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
//# sourceMappingURL=home.js.map