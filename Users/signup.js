const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");

module.exports = async (req, res) => {
    try {
          const full_name =  req.body.full_name;
          const email =   req.body.email ;
          const password =  req.body.password ;

          if (!full_name || !email || !password)
          {
            res.status( StatusCodes.BAD_REQUEST );
            res.send( "Data is missing");
          }
          else {
            const used_email =  users_database.users_list.find( user =>  user.email == email )

            if(!used_email)
            {
              const new_user_id = users_database.create_new_user(full_name,email,password);
              res.status( StatusCodes.OK );
              res.send(`"ID":"${new_user_id}"`);
            }
            else {
              res.status( StatusCodes.BAD_REQUEST );
              res.send( "Email is already being used");
            }
          }
      }
    catch (error) {
        res.status(StatusCodes.BAD_GATEWAY);
        res.send("Error creating the user");
    }
    return;
}