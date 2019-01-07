import * as React from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import StudentAddForm from './studentAddForm';
import { createStudent } from '../../actions/home';
import { navigationOptions } from '../shared/NavigationOptions';
import { fetchStudentAndUpdate } from '../../actions/home';
import { navigateTo } from '../../actions/base';
class StudentAdd extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.submit = (values) => {
            // tslint:disable-next-line:no-shadowed-variable
            const { createStudent, navigateTo } = this.props;
            createStudent(values);
            navigateTo('SelectReason');
        };
    }
    render() {
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Content, null,
                React.createElement(StudentAddForm, { submit: this.submit, saving: this.props.saving, student: this.props.student, checkAndPopuplate: this.props.fetchStudentAndUpdate })));
    }
}
StudentAdd.navigationOptions = navigationOptions(({ navigation }) => (navigation.getParam('id') ? 'Edit House' : 'Add New House'));
function mapStateToProps(state) {
    return {
        error: state.schoolSignUp.error,
        saving: state.schoolSignUp.saving,
        message: state.schoolSignUp.message,
        student: state.home.student
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        createStudent,
        fetchStudentAndUpdate,
        navigateTo
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentAdd);
//# sourceMappingURL=studentAdd.js.map