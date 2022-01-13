const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("../Users/users_database");

function auth_by_role(role) {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const result = await authenticator_helper(token, role);
            if (!result) {
                console.log("positive negative");
                res.status(StatusCodes.UNAUTHORIZED);
                return res.send("Access denied");
            }
            next();
        } catch (error) {
            res.status(StatusCodes.UNAUTHORIZED);
            res.send(`Error - Authenticating Process Failed - ${error}`);
        }
    }
}

async function authenticator_helper(token, role) {
    const requestor = users_database.users_list.find(user => {
        return (user.token == token && users_database.has_valid_token(user));
      });
    if (!requestor || requestor.user_status > role) {
        return false;
    }
    return true;
}

module.exports = {
    auth_by_role
}