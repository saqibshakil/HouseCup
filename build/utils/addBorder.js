const colors = [
    'red', 'green', 'blue', 'gray', 'brown'
];
let i = 0;
export default function getBorder() {
    return {
        borderWidth: 2,
        borderColor: colors[i++ % colors.length]
    };
}
//# sourceMappingURL=addBorder.js.map