const { readdir, stat } = require('fs');
const path = require('path');
const { stdout } = process;
const folder = path.join(__dirname, 'secret-folder');

readdir(folder, { withFileTypes: true }, cb);

function cb(err, files) {
    try {
        for (let file of files) {
            let fileName = file.name.toString();
            let filePath = path.join(__dirname, 'secret-folder', `${file.name}`)
            if (file.isFile()) {
                stat(filePath, (err, stats) => {
                    stdout.write(`${fileName.slice(0, file.name.indexOf('.'))} - ${path.extname(`${fileName}`).toString().slice(1)} - ${stats.size}\n`)
                });
            }
        }
    }
    catch (err) {
        stdout.write(`Error:\nPlease check the path\n${folder}`);
    }
}