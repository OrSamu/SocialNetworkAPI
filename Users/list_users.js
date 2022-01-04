const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");

module.exports = async (req, res) => {
    try {
        res.send(JSON.stringify(users_database.users_list));
        res.status( StatusCodes.OK);
    }
    catch (error) {
        res.status(StatusCodes.BAD_GATEWAY);
        res.send("Error retrieving users list");
    }
    return;
}