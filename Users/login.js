const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");

module.exports = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;      

        if (!email || !password) {
          res.status( StatusCodes.BAD_REQUEST );
          res.send( "Data is missing");
        }
        else {
            const token = users_database.authentication(email,password);
            if(token != null && token != -1) {
                res.status( StatusCodes.OK);
                res.send(`"token":"${token}"`);    
            }
            else {
                if(token === -1) {
                    res.status(StatusCodes.UNAUTHORIZED);
                    res.send("Problem with user status");
                }
                else {
                    res.status(StatusCodes.UNAUTHORIZED);
                    res.send("Wrong email or password");
                }
            }
        }
    }
    catch (error) {
        res.status(StatusCodes.BAD_GATEWAY);
        res.send("Error logging in - " + error);
    }
    return;
}