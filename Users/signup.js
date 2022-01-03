const { StatusCodes } = require("http-status-codes");
//const output_file = require ("");

module.exports = async (req, res) => {
    try {
        const {
            body,
          } = req
      
          console.log(body);

          const {
              full_name,
              email,
              password
          } = body

          /*if(is_email_used(email) == true)
          {
              res.status( StatusCodes.BAD_REQUEST );
              res.send( "Email is already being used");
              return;
          }
          else {
              const id = add_new_user(body);
          }*/
      
          //const id=fs.database.get_new_id();
          console.log(`full name: ${full_name}, email: ${email}, password ssh: ${password}`)

          res.status( StatusCodes.OK );
          res.send("2");
          return;
      }
    catch (error) {
        res.status(StatusCodes.BAD_GATEWAY);
        res.send("Error creating the user");
        const error_log = "Error - can not create user"
        return;
    }
}

