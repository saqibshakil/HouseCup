import { Color } from "csstype";

const colors = [
    'red', 'green', 'blue', 'gray', 'brown'
]
let i=0
export default function getBorder() : { borderWidth: number, borderColor: Color  }{
    return {
        borderWidth: 2,
        borderColor: colors[i++ % colors.length]
    }

}