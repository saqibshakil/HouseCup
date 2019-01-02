import * as React from 'react';
import { Container, Content, Text, View, Button, H3, H1 } from 'native-base';
import { NavigationContainerProps } from 'react-navigation';
import { connect } from 'react-redux';
import colors from '../../native-base-theme/variables/commonColor'

export interface IStateProps {
    message: string;
    points: [{ id: any, name: string, points: number }]
}
export interface State {
}

class Home extends React.Component<NavigationContainerProps & IStateProps, State> {
    static navigationOptions = {
        headerStyle: { backgroundColor: colors.brandPrimary, height: 0 }
    }

    gotoLogin = () => {
        const { navigation: { navigate } } = this.props
        navigate({ routeName: 'Login' })
    }

    gotoSchoolSignup = () => {
        const { navigation: { navigate } } = this.props
        navigate({ routeName: 'SchoolSignUp' })
    }

    gotoTeacherSignup = () => {
        const { navigation: { navigate } } = this.props
        navigate({
            routeName: 'TeacherSignUp'
        })
    }

    render() {
        const { points } = this.props
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Content style={{ paddingHorizontal: 10, paddingTop: 10 }}  >
                <Button primary block onPress={this.gotoLogin}>
                    <Text>Award Points</Text>
                </Button>
                <View style={{ flexDirection: 'row' }}>
                    {points.map(p =>
                        <Button block style={{ width: '50%', marginVertical: 10, marginRight: 5, flexDirection: 'column' }}
                            light onPress={this.gotoTeacherSignup}>
                            <H3>{p.name}</H3>
                            <H1>{p.points}</H1>
                        </Button>
                    )}
                </View>
                {this.props.message && <View><Text>{this.props.message}</Text></View>}
            </Content>
        </Container>
    }
}

function mapStateToProps(state: any): IStateProps {
    const points = state.house.houses.map((p: any) => {
        return {
            id: p.id,
            name: p.name,
            // tslint:disable-next-line:triple-equals
            points: state.home.points.find((x: any) => x.houseId == p.id)
        }
    })
    return {
        message: state.schoolSignUp.message,
        points
    }
}

export default connect(mapStateToProps)(Home)
