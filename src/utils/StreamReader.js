var { Readable } = require('stream');

async function StreamReader(resp) {
    const decoder = new TextDecoder();
    const reader = resp.body.getReader();
    let done = false;
    let valueString = ''
    while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        valueString = valueString + decoder.decode(value)
    }
    //all
    const data = JSON.parse(valueString);
    return data
}
//export default StreamReader
module.exports = StreamReader