const fs = require('fs');
const tty = require('tty');
const path = require('path');
const { stdin, stdout } = process;
const text = path.join(__dirname);
const output = fs.createWriteStream(`${text}\\text.txt`, 'utf-8');


stdout.write('Enter the text, please:\n\n');
// stdin.pipe(output);
stdin.on('data', data => {
    let dataToString = data.toString();
    if (dataToString.trim() === "exit") {
        process.exit();
    } else output.write(dataToString);
});

process.on('SIGINT', () => {
    process.exit();
});

process.on('exit', code => {
    if (code === 0){
    stdout.write('Everything is ok. Well done.');}
});