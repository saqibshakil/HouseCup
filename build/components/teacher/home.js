import * as React from 'react';
import { Container, Content, Text, View, Button, H3, H1, Header, Body, Left } from 'native-base';
import { connect } from 'react-redux';
import colors from '../../native-base-theme/variables/commonColor';
import { Image } from 'react-native';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
class Home extends React.Component {
    constructor() {
        super(...arguments);
        this.gotoScan = () => {
            this.props.navigateTo('ScanStudent');
        };
    }
    render() {
        const { points } = this.props;
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Header, null,
                React.createElement(Left, { style: { flex: 0 } },
                    React.createElement(Image, { resizeMode: 'contain', style: { width: 38, height: 38 }, source: require('./../../../assets/icon.png') })),
                React.createElement(Body, { style: { alignItems: 'center' } },
                    React.createElement(Text, { style: { color: 'white' } }, "House Cup"))),
            React.createElement(Content, { style: { paddingHorizontal: 10, paddingTop: 10 } },
                React.createElement(Button, { primary: true, block: true, onPress: this.gotoScan },
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
        points
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        navigateTo
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
//# sourceMappingURL=home.js.map