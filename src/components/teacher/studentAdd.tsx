import * as React from 'react';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationContainerProps } from 'react-navigation';
import StudentAddForm from './studentAddForm'
import { createStudent } from '../../actions/home';
import { navigationOptions } from '../shared/NavigationOptions';
import { fetchStudentAndUpdate } from '../../actions/home';
import { FieldProps } from 'formik';

export interface IStateProps {
    saving: boolean,
    error: string,
    message: string,
    student: any
}

export interface IDispatchProps {
    createStudent: (admin: any) => void,
    fetchStudentAndUpdate: (fieldProps: FieldProps<any>) => void
}
export interface State {
    inputText: string
}
class StudentAdd extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {
    static navigationOptions = navigationOptions(({ navigation }: any) => (navigation.getParam('id') ? 'Edit House' : 'Add New House'))
    textInput: any;
    state = {
        inputText: ''
    }

    submit = (values: any) => {
        // tslint:disable-next-line:no-shadowed-variable
        const { createStudent, navigation: { goBack } } = this.props
        createStudent(values)
        goBack()
    }

    render() {
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Content>
                <StudentAddForm submit={this.submit as any}
                    saving={this.props.saving}
                    student={this.props.student}
                    checkAndPopuplate={this.props.fetchStudentAndUpdate} />
            </Content>
        </Container>;
    }
}

function mapStateToProps(state: any): IStateProps {
    return {
        error: state.schoolSignUp.error,
        saving: state.schoolSignUp.saving,
        message: state.schoolSignUp.message,
        student: state.home.student
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        createStudent,
        fetchStudentAndUpdate
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentAdd)