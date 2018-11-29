import * as React from "react";
import { Toast, Title, Body, Container, Header, Content, Footer, Text, View, Left } from "native-base";
import { Image } from 'react-native'
import { RegisterView } from "./LoginView";
import getBorder from "../../utils/addBorder";
import { NavigationContainerProps } from "react-navigation";

export interface Props {
    navigation: any;
    valid: boolean;
}
export interface State {
    inputText: string
}
class Login extends React.Component<Props, State> {
    navigationOptions = (props: NavigationContainerProps) => {
        return {
          // headerBackImage: params.headerBackImage,
          headerTitle: <Text style={{color: 'black'}}>Welcome</Text>,
          // Render a button on the right side of the header.
          // When pressed switches the screen to edit mode.
        };
      };
    textInput: any;
    state = {
        inputText: ''
    }

    submit = (values: any) => {
        console.log(values)
    }

    render() {
        return <Container style={{ flex: 1, alignSelf: 'stretch' }}>
            <Header style={{ flex:0  }}>
                <Left>
                    <Image style={{ width: 36, height: 36  }} resizeMode='contain' source={require('./../../../assets/cup.png')} />
                </Left>
                <Body>
                    <Title>House Cup Login</Title>
                </Body>
            </Header>
            <Content>
                <RegisterView  submit={this.submit as any} />
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

export default Login;
