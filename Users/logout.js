const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");

module.exports = async (req, res) => {
    try {
        const user_token = req.body.token;
        const user_access_level = users_database.check_user_by_token(user_token);
        if (user_access_level >= 0) {
            const result = log_user_out_by_token(user_token);
            res.status(StatusCodes.OK);
        }
        else {
            res.status(StatusCodes.UNAUTHORIZED);
        }
    }
    catch (error) {
        res.status(StatusCodes.BAD_GATEWAY);
        res.send("Error logging in - " + error);
    }
    return;
}