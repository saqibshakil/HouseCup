import * as React from 'react'
import { TouchableOpacity } from 'react-native';
import IonIcons from 'react-native-ionicons'

export const navigationOptions = (title: string | (({ navigation }: any) => string)) => ({ navigation }: any) => ({
    title: typeof (title) === 'string' ? title : title({ navigation }),
    headerLeft: <TouchableOpacity onPress={() => navigation.goBack()}>
        <IonIcons name='arrow-round-back' size={25} style={{ marginTop: 0, marginLeft: 20, color: 'white' }} />
    </TouchableOpacity>
})