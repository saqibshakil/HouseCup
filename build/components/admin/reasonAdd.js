import * as React from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReasonAddForm from './reasonAddForm';
import { createReason } from '../../actions/reason';
import { navigationOptions } from '../shared/NavigationOptions';
class ReasonAdd extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.submit = (values) => {
            // tslint:disable-next-line:no-shadowed-variable
            const { createReason, navigation: { goBack } } = this.props;
            createReason(values);
            goBack();
        };
    }
    render() {
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Content, null,
                React.createElement(ReasonAddForm, { submit: this.submit, saving: this.props.saving, reason: this.props.reason })));
    }
}
ReasonAdd.navigationOptions = navigationOptions(({ navigation }) => (navigation.getParam('id') ? 'Edit Reason' : 'Add New Reason'));
function mapStateToProps(state, ownProps) {
    return {
        error: state.schoolSignUp.error,
        saving: state.schoolSignUp.saving,
        message: state.schoolSignUp.message,
        reason: state.reason.reasons && state.reason.reasons.filter((p) => p.id === ownProps.navigation.state.params.id)[0]
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createReason
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(ReasonAdd);
//# sourceMappingURL=reasonAdd.js.map