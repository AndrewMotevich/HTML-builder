const fs = require('fs');
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

process.on('exit', code => {
    if (code === 0){
    stdout.write('Everything is ok. Well done.');}
});

process.on('SIGINT', function() {
    console.log("1Caught interrupt signal <CTRL+C>\nGoodbye!");
    process.exit();
});