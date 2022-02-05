const fs = require('fs');

console.log("=========  INIT  ==================================");

const exists = fs.existsSync('./database.json');

if (exists) {
    console.log("=============  DATABASE FILE ALREADY EXISTS =======");
    fs.unlinkSync('./database.json');
    console.log("=============  DATABASE FILE DELETED ==============");
}

console.log("=============  CREATING DATABASE FILE =============");

fs.copyFileSync('./database.json.example', './database.json');

console.log("============= DONE INIT ===========================");