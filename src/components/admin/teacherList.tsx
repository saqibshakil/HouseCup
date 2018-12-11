import * as React from 'react';
import { Icon, Toast, Title, Body, Container, Header, Content, Footer, Text, View, Left, List, ListItem, Right, Button } from 'native-base';
import getBorder from '../../utils/addBorder';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAdmin as createAdminAction, removeHouse } from '../../actions/school';
import { NavigationContainerProps } from 'react-navigation';
import { navigateTo } from '../../actions/base';

export interface IStateProps {
    teachers: []
}

export interface IDispatchProps {
    createAdmin: (admin: any) => void
    navigateTo: (to: any, props: any) => void
}
export interface State {
    inputText: string
}
class HouseList extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {
    textInput: any;
    state = {
        inputText: ''
    }
    submit = (values: any) => {
        const { createAdmin, navigation: { navigate } } = this.props
    }

    render() {
        const { teachers } = this.props
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Header style={{ flex: 0 }}>
                <Body>
                    <Title>House Setup</Title>
                </Body>
            </Header>
            <Content style={getBorder()}>
                <List>
                    {
                        teachers.map(this.listItem)
                    }
                </List>
            </Content>
        </Container>;
    }

    listItem = (teacher: any) =>  {
        return <ListItem key={teacher.id}>
            <Content>
                <Text>{teacher.name}</Text>
            </Content>
            <Right style={{ flexDirection: 'row' }}>
                <Button primary icon onPress={() => this.editTeacher(teacher.id)} ><Icon name='open' /></Button>
                <Button danger icon><Icon name='trash' /></Button>
            </Right>
        </ListItem>
    }

    editTeacher = (id: string) => {
        this.props.navigateTo('SignUp', { id })
    }
}

function mapStateToProps(state: any): IStateProps {
    return {
        teachers: state.teacher.teachers
    }
}

function mapDispatchToProps(dispatch: any) {
    return bindActionCreators({
        removeHouse,
        navigateTo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseList)