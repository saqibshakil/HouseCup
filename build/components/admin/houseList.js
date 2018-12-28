import * as React from 'react';
import { Icon, Title, Body, Container, Header, Content, Text, List, ListItem, Right, Button } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
import { remove } from '../../actions/house';
class HouseList extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.listItem = (houses) => {
            return React.createElement(ListItem, { key: houses.id },
                React.createElement(Content, null,
                    React.createElement(Text, null, houses.name)),
                React.createElement(Right, { style: { flexDirection: 'row' } },
                    React.createElement(Button, { primary: true, icon: true, onPress: () => this.editHouse(houses.id) },
                        React.createElement(Icon, { name: 'open' })),
                    React.createElement(Button, { danger: true, icon: true, onPress: () => this.props.remove(houses.id) },
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
        const { houses, canAdd } = this.props;
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Header, { style: { flex: 0 } },
                React.createElement(Body, null,
                    React.createElement(Title, null, "Houses")),
                canAdd && React.createElement(Button, { transparent: true, onPress: this.newTeacher },
                    React.createElement(Icon, { name: 'add' }))),
            React.createElement(Content, null,
                React.createElement(List, null, houses.map(this.listItem))));
    }
}
function mapStateToProps(state) {
    return {
        houses: state.house.houses,
        canAdd: true
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        remove,
        navigateTo
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HouseList);
//# sourceMappingURL=houseList.js.map