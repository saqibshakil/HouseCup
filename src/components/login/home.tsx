import * as React from 'react';
import { Body, Container, Header, Content, Footer, Text, View, Button } from 'native-base';
import { Image, Platform } from 'react-native'
import { NavigationContainerProps } from 'react-navigation';
import { connect } from 'react-redux';

export interface Props {
	valid: boolean;
	message: string;
}
export interface State {
	inputText: string
}

class Home extends React.Component<NavigationContainerProps & Props, State> {
	static navigationOptions = {
		title: 'House Cup',
	}

	textInput: any;
	state = {
		inputText: ''
	}

	submit = (values: any) => {
		console.log(values)
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
		return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
			<Header style={{ height: 250 }}>
				<Body style={{ alignItems: 'center' }}>
					<View padder>
						<Text style={{ color: Platform.OS === 'ios' ? '#000' : '#FFF' }} />
					</View>
					<Image style={{ width: 200, height: 150 }} resizeMode='contain' source={require('./../../../assets/cup.png')} />
					<View padder>
						<Text style={{ color: Platform.OS === 'ios' ? '#000' : '#FFF' }} />
					</View>
				</Body>
			</Header>
			<Content style={{ paddingHorizontal: 10, paddingTop: 10 }}  >
				<Button primary block onPress={this.gotoLogin}>
					<Text>Sign In</Text>
				</Button>
				<View style={{ flexDirection: 'row' }}>
					<Button block style={{ flex: 1, marginVertical: 10, marginRight: 5 }} light onPress={this.gotoTeacherSignup}>
						<Text>Teacher Signup</Text>
					</Button>
					<Button block style={{ flex: 1, marginVertical: 10, marginLeft: 5 }} light onPress={this.gotoSchoolSignup}>
						<Text>School Signup</Text>
					</Button>

				</View>
				{this.props.message && <View><Text>{this.props.message}</Text></View>}
			</Content>
			<Footer style={{ backgroundColor: '#F8F8F8' }}>
				<View style={{ alignItems: 'center', opacity: 0.5, flexDirection: 'row' }}>
					<View padder>
						<Text style={{ color: '#000' }}>Made with love at </Text>
					</View>
					<Image
						source={{ uri: 'https://geekyants.com/images/logo-dark.png' }}
						style={{ width: 422 / 4, height: 86 / 4 }}
					/>
				</View>
			</Footer>
		</Container>;
	}
}

function mapStateToProps(state: any) {
	return {
		message: state.schoolSignUp.message
	}
}

export default connect(mapStateToProps)(Home)
