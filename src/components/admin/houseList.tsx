import * as React from 'react';
import { Icon, Title, Body, Container, Header, Content, Text, List, ListItem, Right, Button } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationContainerProps } from 'react-navigation';
import { navigateTo } from '../../actions/base';
import { remove } from '../../actions/house';
import colors from '../../native-base-theme/variables/commonColor'

export interface IStateProps {
    houses: [],
    canAdd: boolean
}

export interface IDispatchProps {
    navigateTo: (to: any, props: any) => void
    remove: (id: string) => void
}

export interface State {
    inputText: string
}

class HouseList extends React.Component<IStateProps & IDispatchProps & NavigationContainerProps, State> {

    static navigationOptions = {
        headerStyle: { backgroundColor: colors.brandPrimary, height: 0 }
    }
    textInput: any;
    state = {
        inputText: ''
    }

    render() {
        const { houses, canAdd } = this.props
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Header style={{ flex: 0 }}>
                <Body>
                    <Title>Houses</Title>
                </Body>
                {canAdd && <Button transparent onPress={this.newTeacher}><Icon name='add'></Icon></Button>}
            </Header>
            <Content>
                <List>
                    {
                        houses.map(this.listItem)
                    }
                </List>
            </Content>
        </Container>;
    }

    listItem = (houses: any) => {
        return <ListItem key={houses.id}>
            <Content>
                <Text>{houses.name}</Text>
            </Content>
            <Right style={{ flexDirection: 'row' }}>
                <Button primary icon onPress={() => this.editHouse(houses.id)} ><Icon name='open' /></Button>
                <Button danger icon onPress={() => this.props.remove(houses.id)}><Icon name='trash' /></Button>
            </Right>
        </ListItem>
    }

    editHouse = (id: string) => {
        this.props.navigateTo('Detail', { id })
    }

    newTeacher = () => {
        this.props.navigateTo('Detail', {})
    }
}

function mapStateToProps(state: any): IStateProps {
    return {
        houses: state.house.houses,
        canAdd: true
    }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return bindActionCreators({
        remove,
        navigateTo
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HouseList)