import * as React from 'react';
import { Container, Content, Text, View, Button, H3, H1, Header, Body, Left, Right } from 'native-base';
import { NavigationContainerProps } from 'react-navigation';
import { connect } from 'react-redux';
import colors from '../../native-base-theme/variables/commonColor'
import { Image } from 'react-native'
import { bindActionCreators } from 'redux';
import { navigateTo } from '../../actions/base';
import { logout } from '../../actions/login';

export interface IStateProps {
    message: string;
    points: [{ id: any, name: string, points: number, color: string }]
    saving: boolean
}
export interface IDispatchProps {
    navigateTo: (path: string, params?: any) => void
    logout: () => void
}

export interface State {
}

class Home extends React.Component<NavigationContainerProps & IStateProps & IDispatchProps, State> {
    static navigationOptions = {
        headerStyle: { backgroundColor: colors.brandPrimary, height: 0 }
    }

    gotoScan = () => {
        this.props.navigateTo('ScanStudent')
    }

    logout = () => {
        const { saving } = this.props
        if (!saving)
            this.props.logout()
    }
    render() {
        const { points } = this.props
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Header>
                <Left style={{ flex: 0 }}>
                    <Image resizeMode='contain' style={{ width: 38, height: 38 }} source={require('./../../../assets/icon.png')} />
                </Left>
                <Body style={{ alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>House Cup</Text>
                </Body>
                <Right>
                    <Button danger onPress={this.logout} small><Text>Logout</Text></Button>
                </Right>
            </Header>
            <Content style={{ paddingHorizontal: 10, paddingTop: 10 }}  >
                <Button primary block onPress={this.gotoScan}>
                    <Text>Award Points</Text>
                </Button>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {points.map((p) =>
                        <View key={p.id} style={{
                            width: '49%', marginVertical: 5, flexDirection: 'column'
                        }}>
                            <Button block style={{
                                height: 100, backgroundColor: p.color, flexDirection: 'column'
                            }}
                                light>
                                <H3>{p.name}</H3>
                                <H1>{p.points}</H1>
                            </Button>
                        </View>
                    )}
                </View>
            </Content>
        </Container>
    }
}

function mapStateToProps(state: any): IStateProps {
    const points = state.house.houses.map((p: any) => {
        // tslint:disable-next-line:triple-equals
        const housePoints = state.home.points.find((x: any) => x.houseId == p.id)
        return {
            id: p.id,
            name: p.name,
            color: p.color,
            // tslint:disable-next-line:triple-equals
            points: housePoints === undefined ? 0 : housePoints.Points
        }
    })
    return {
        message: state.schoolSignUp.message,
        points,
        saving: state.schoolSignUp.saving
    }
}

function mapDispatchToProps(dispatch: any): IDispatchProps {
    return bindActionCreators({
        navigateTo,
        logout
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
