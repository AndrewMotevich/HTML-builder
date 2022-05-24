const { readdir } = require('fs');
const { copyFile, mkdir, rm } = require('fs/promises');
const path = require('path');
const folder = path.join(__dirname, 'files');
const copyFolder = path.join(__dirname, 'files-copy');

async function copyDir() {
    try {
       await mkdir(copyFolder, { recursive: true });
       await rm(copyFolder, { recursive: true });
       await mkdir(copyFolder, { recursive: true });
       await readdir(folder, (err, files) => {
           for (let file of files){
               let oldPathFile = path.join(__dirname, 'files', `${file}`);
               let newPathFile = path.join(__dirname, 'files-copy', `${file}`);
               copyFile(oldPathFile, newPathFile);
           }
       })
       await console.log("Success copy")
    }
    catch (err) {
        console.log("Error to copy files")
    }
}

copyDir();