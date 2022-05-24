const { readdir, readFile, writeFile, appendFile } = require('fs');
const path = require('path');
const stylesFolder = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, "project-dist", 'bundle.css');

async function joinToBundle() {
    try {
        writeFile(bundleFile, '', function(){console.log('done')})
        let pathToFiles = new Promise(function (resolve, reject) {
            readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
                let pathToFileArray = [];
                for (let file of files) {
                    let extension = path.extname(`${file.name.toString()}`);
                    let pathToFile = path.join(__dirname, 'styles', `${file.name.toString()}`);
                    if (extension === '.css' && file.isFile()) {
                        pathToFileArray.push(pathToFile)
                    }
                } console.log(pathToFileArray)
                resolve(pathToFileArray);
            }
            )
        }
        )
            .then(pathToFileArray => {
                for (let i = 0; i < pathToFileArray.length; i += 1) {
                    let dataFromFiles = '';

                    let pathTo = new Promise(function (resolve, reject) {
                        readFile(pathToFileArray[i], (err, data) => {
                            dataFromFiles = `${dataFromFiles}\n${data.toString()}\n`;
                            resolve(dataFromFiles)
                        })
                    })
                    pathTo.then(dataFromFiles => {appendFile(bundleFile, dataFromFiles, (data) => { console.log("Write to file") });});
                }
            })
    }
    catch (err) {
        console.log("Global Error")
    }
}
joinToBundle()