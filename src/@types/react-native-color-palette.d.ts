
import * as React from 'react';
declare module 'react-native-color-palette'; {
    export default ColorInput;
}

declare class ColorInput extends React.Component<ReactSwipe.Props> {
}

declare namespace ReactSwipe {

    interface Props {
        onChange: (color: string) => void
        defaultColor?: string
        colors: [string]
        title?: string
        icon: any
        value?: string
    }
}
