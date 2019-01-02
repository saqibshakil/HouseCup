import * as React from 'react';
import { Icon, Title, Body, Container, Header, Content, Text, List, ListItem, Right, Button } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeTeacher } from '../../actions/school';
import { navigateTo } from '../../actions/base';
import colors from '../../native-base-theme/variables/commonColor';
class TeacherList extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            inputText: ''
        };
        this.listItem = (teacher) => {
            return React.createElement(ListItem, { key: teacher.id },
                React.createElement(Content, null,
                    React.createElement(Text, null, teacher.name)),
                React.createElement(Right, { style: { flexDirection: 'row' } },
                    React.createElement(Button, { primary: true, icon: true, onPress: () => this.editTeacher(teacher.id) },
                        React.createElement(Icon, { name: 'open' })),
                    React.createElement(Button, { danger: true, icon: true, onPress: () => this.props.removeTeacher(teacher.id) },
                        React.createElement(Icon, { name: 'trash' }))));
        };
        this.editTeacher = (id) => {
            this.props.navigateTo('SignUp', { id });
        };
        this.newTeacher = () => {
            this.props.navigateTo('SignUp', { admin: false });
        };
    }
    render() {
        const { teachers, canAdd } = this.props;
        return React.createElement(Container, { style: { flex: 1, alignSelf: 'stretch' } },
            React.createElement(Header, { style: { flex: 0 } },
                React.createElement(Body, null,
                    React.createElement(Title, null, "Teachers")),
                canAdd && React.createElement(Button, { transparent: true, onPress: this.newTeacher },
                    React.createElement(Icon, { name: 'add' }))),
            React.createElement(Content, null,
                React.createElement(List, null, teachers.map(this.listItem))));
    }
}
TeacherList.navigationOptions = {
    headerStyle: { backgroundColor: colors.brandPrimary, height: 0 }
};
function mapStateToProps(state) {
    return {
        teachers: state.teacher.teachers,
        canAdd: state.teacher.teachers.length < state.login.maxTeachers
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        removeTeacher,
        navigateTo
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TeacherList);
//# sourceMappingURL=teacherList.js.map