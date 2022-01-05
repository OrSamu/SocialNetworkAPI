const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const { ssh_function } = require("./users_database");
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
            console.log(`${email} ${password}`);
            const ssh_password = users_database.ssh_function(password);
            const token = users_database.authentication(email,ssh_password);
            console.log(`${ssh_password} ${token}`);
            if(token != null) {
                res.status( StatusCodes.OK);
                res.send(`"token:""${token}"`);    
                }
            else {
                res.status( StatusCodes.BAD_REQUEST );
                res.send( "Wrong email or password");
                }
            }
            
    }
    catch (error) {
        res.status(StatusCodes.BAD_GATEWAY);
        res.send("Error logging in");
    }
    return;
}