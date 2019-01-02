import * as React from 'react';
import { Icon, Title, Body, Container, Header, Content, Text, List, ListItem, Right, Button } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
import { remove } from '../../actions/reason';
import colors from '../../native-base-theme/variables/commonColor';
class ReasonList extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.listItem = (reason) => {
            return React.createElement(ListItem, { key: reason.id },
                React.createElement(Content, null,
                    React.createElement(Text, null, reason.reason)),
                React.createElement(Right, { style: { flexDirection: 'row' } },
                    React.createElement(Button, { primary: true, icon: true, onPress: () => this.editHouse(reason.id) },
                        React.createElement(Icon, { name: 'open' })),
                    React.createElement(Button, { danger: true, icon: true, onPress: () => this.props.remove(reason.id) },
                        React.createElement(Icon, { name: 'trash' }))));
        };
        this.editHouse = (id) => {
            this.props.navigateTo('Detail', { id });
        };
        this.newTeacher = () => {
            this.props.navigateTo('Detail', {});
        };
    }
    render() {
        const { reasons: reasons, canAdd } = this.props;
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Header, { style: { flex: 0 } },
                React.createElement(Body, null,
                    React.createElement(Title, null, "Reasons")),
                canAdd && React.createElement(Button, { transparent: true, onPress: this.newTeacher },
                    React.createElement(Icon, { name: 'add' }))),
            React.createElement(Content, null,
                React.createElement(List, null, reasons.map(this.listItem))));
    }
}
ReasonList.navigationOptions = {
    headerStyle: { backgroundColor: colors.brandPrimary, height: 0 }
};
function mapStateToProps(state) {
    return {
        reasons: state.reason.reasons,
        canAdd: true
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        remove,
        navigateTo
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ReasonList);
//# sourceMappingURL=reasonList.js.map