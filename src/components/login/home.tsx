import * as React from "react";
import { Toast, Title, Body, Container, Header, Content, Footer, Text, View, Button } from "native-base";

import { Image, Platform } from 'react-native'
import Login from "./login";
import { createStackNavigator, NavigationNavigatorProps, createNavigationContainer, createAppContainer } from "react-navigation";

export interface Props {
	navigation: any;
	valid: boolean;
}
export interface State {
	inputText: string
}

class Home extends React.Component<NavigationNavigatorProps & Props, State> {
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

	render() {
		return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
			<Header style={{ height: 250 }}>
				<Body style={{ alignItems: "center" }}>
					<View padder>
						<Text style={{ color: Platform.OS === "ios" ? "#000" : "#FFF" }} />
					</View>
					<Image style={{ width: 200, height: 150 }} resizeMode='contain' source={require('./../../../assets/cup.png')} />
					<Title>House Cup</Title>
					<View padder>
						<Text style={{ color: Platform.OS === "ios" ? "#000" : "#FFF" }} />
					</View>
				</Body>
			</Header>
			<Content style={{ paddingHorizontal: 10, paddingTop: 10 }}>
				<Button primary block onPress={this.gotoLogin}>
					<Text>Sign In</Text>
				</Button>
				<View style={{ flexDirection: 'row' }}>
					<Button block style={{flex: 1, marginVertical:10, marginRight: 5}} light onPress={this.gotoLogin}>
						<Text>Teacher Signup</Text>
					</Button>
					<Button block style={{flex: 1, marginVertical:10, marginLeft: 5}} light onPress={this.gotoSchoolSignup}>
						<Text>School Signup</Text>
					</Button>

				</View>

			</Content>
			<Footer style={{ backgroundColor: "#F8F8F8" }}>
				<View style={{ alignItems: "center", opacity: 0.5, flexDirection: "row" }}>
					<View padder>
						<Text style={{ color: "#000" }}>Made with love at </Text>
					</View>
					<Image
						source={{ uri: "https://geekyants.com/images/logo-dark.png" }}
						style={{ width: 422 / 4, height: 86 / 4 }}
					/>
				</View>
			</Footer>
		</Container>;
	}
}



export default Home;

