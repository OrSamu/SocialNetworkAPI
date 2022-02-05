const fs = require('fs');
const path = require('path');

const databasePath = path.resolve('database.json');


const readDb = async (tableName) => {
    const database = JSON.parse(fs.readFileSync(databasePath));

    return database[tableName];
}

const writeDb = async (tableName, data) => {
    const database = JSON.parse(fs.readFileSync(databasePath));

    const latestRow = database[tableName][database[tableName].length - 1];
    const newId = latestRow ? latestRow.id + 1 : 1;

    database[tableName].push({
        ...data,
        id: newId
    });

    fs.writeFileSync(databasePath, JSON.stringify(database));

    return {
        id: newId,
        ...data
    };
}

const updateDb = async (tableName, data) => {
    const database = JSON.parse(fs.readFileSync(databasePath));

    const { id: updateId } = data;
    database[tableName] = database[tableName]
        .map((row) => {
            const { id } = row;

            if (id === updateId) return data;

            return row;
        });

    fs.writeFileSync(databasePath, JSON.stringify(database));

    return data;
}

module.exports = {
    readDb,
    writeDb,
    updateDb
}