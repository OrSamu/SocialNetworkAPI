const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const { has_valid_token } = require('../Users/users_database');
const { readDb } = require('../database');

const authenticate = async (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').split(' ')[1];

        const user = (await readDb('users')).find(user => {
            return (user.token == token && has_valid_token(user));
          });

        if (!user) {
            res.status(StatusCodes.UNAUTHORIZED);
            return res.send("Access denied");
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED);
        res.send(`Error - Authenticating Process Failed - ${error}`);
    }
}

const authorize = (role) => (req, res, next) => {
    if (role > req.user.user_status) {
        return res
            .status(StatusCodes.FORBIDDEN)
            .send();
    }

    next();
}

module.exports = {
    authenticate,
    authorize
}