import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-ionicons';
export const navigationOptions = (title) => ({ navigation }) => ({
    title: typeof (title) === 'string' ? title : title({ navigation }),
    headerLeft: React.createElement(TouchableOpacity, { onPress: () => navigation.goBack() },
        React.createElement(IonIcons, { name: 'arrow-round-back', size: 25, style: { marginTop: 0, marginLeft: 20, color: 'white' } }))
});
//# sourceMappingURL=NavigationOptions.js.map