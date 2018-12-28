import * as React from 'react';
import { Icon, Title, Body, Container, Header, Content, Footer, Text, View, Left, List, ListItem, Right, Button } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { removeTeacher } from '../../actions/school';
import { NavigationContainerProps } from 'react-navigation';
import { navigateTo } from '../../actions/base';

export interface IStateProps {
    teachers: [],
    canAdd: boolean
}

export interface IDispatchProps {
    createAdmin: (admin: any) => void
    navigateTo: (to: any, props: any) => void
    removeTeacher: (id: string) => void
}
export interface State {
    inputText: string
}

class TeacherList extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {
    textInput: any;
    state = {
        inputText: ''
    }
    submit = (values: any) => {
        const { createAdmin, navigation: { navigate } } = this.props
    }

    render() {
        const { teachers, canAdd } = this.props
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Header style={{ flex: 0 }}>
                <Body>
                    <Title>Teachers</Title>
                </Body>
                {canAdd && <Button transparent onPress={this.newTeacher}><Icon name='add'></Icon></Button>}
            </Header>
            <Content>
                <List>
                    {
                        teachers.map(this.listItem)
                    }
                </List>
            </Content>
        </Container>;
    }

    listItem = (teacher: any) => {
        return <ListItem key={teacher.id}>
            <Content>
                <Text>{teacher.name}</Text>
            </Content>
            <Right style={{ flexDirection: 'row' }}>
                <Button primary icon onPress={() => this.editTeacher(teacher.id)} ><Icon name='open' /></Button>
                <Button danger icon onPress={() => this.props.removeTeacher(teacher.id)}><Icon name='trash' /></Button>
            </Right>
        </ListItem>
    }

    editTeacher = (id: string) => {
        this.props.navigateTo('SignUp', { id })
    }

    newTeacher = () => {
        this.props.navigateTo('SignUp', { admin: false })
    }
}

function mapStateToProps(state: any): IStateProps {
    return {
        teachers: state.teacher.teachers,
        canAdd: state.teacher.teachers.length < state.login.maxTeachers

    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        removeTeacher,
        navigateTo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TeacherList)