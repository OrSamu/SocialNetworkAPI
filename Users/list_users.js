const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");

module.exports = async (req, res) => {
    try {
        const token = req.head.token;
        if(users_database.check_user_by_token(token))
        {
            res.send(JSON.stringify(users_database.users_list));
            res.status( StatusCodes.OK);
        }
        else {
            res.status(StatusCodes.UNAUTHORIZED);
        }
}
    catch (error) {
        res.status(StatusCodes.BAD_GATEWAY);
        res.send("Error retrieving users list");
    }
    return;
}