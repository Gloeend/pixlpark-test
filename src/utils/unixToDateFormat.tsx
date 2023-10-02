export default function unixToDateFormat(unix: number) {
    const date = new Date(unix  * 1000);
    return `${date.getDate().toString()}.${date.getMonth() + 1}.${date.getFullYear()}`
}