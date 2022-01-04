const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");

module.exports = async (req, res) => {
    try {
          const full_name =  req.body.full_name;
          const email =   req.body.email ;
          const password =  req.body.password ;

          if(users_database.is_email_used(email) === true)
          {
            res.status( StatusCodes.BAD_REQUEST );
            res.send( "Email is already being used");
          }
          else {
            const new_user_id = users_database.create_new_user(full_name,email,password);
            res.status( StatusCodes.OK );
            res.send(`"ID":"${new_user_id}"`);
          }
      }
    catch (error) {
        res.status(StatusCodes.BAD_GATEWAY);
        res.send("Error creating the user");
    }
    return;
}