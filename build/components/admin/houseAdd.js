import * as React from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HouseAddForm from './houseAddForm';
import { createHouse } from '../../actions/house';
class HouseAdd extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.submit = (values) => {
            // tslint:disable-next-line:no-shadowed-variable
            const { createHouse, navigation: { goBack } } = this.props;
            createHouse(values);
            goBack();
        };
    }
    render() {
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Content, null,
                React.createElement(HouseAddForm, { submit: this.submit, saving: this.props.saving, house: this.props.house })));
    }
}
function mapStateToProps(state, ownProps) {
    return {
        error: state.schoolSignUp.error,
        saving: state.schoolSignUp.saving,
        message: state.schoolSignUp.message,
        house: state.house.houses && state.house.houses.filter((p) => p.id === ownProps.navigation.state.params.id)[0]
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createHouse
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HouseAdd);
//# sourceMappingURL=houseAdd.js.map