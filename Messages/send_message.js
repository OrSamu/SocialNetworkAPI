const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("../Users/users_database");
const messages_database = require("./messages_database");


module.exports = async (req, res) => {
  try {
      const authHead = req.header("Authorization");
      const [type, token] = authHead.split(" ");
      const sender = users_database.get_user_by_token(token);
      if (sender) {
          const { receiver_id,text } = req.body;
          if((receiver_id == 0 && sender.user_status != users_database.UserStatus.ADMIN) || (receiver_id != 0 && sender.user_status < users_database.UserStatus.CREATED))
          {
              messages_database.create_new_message(sender.id,receiver_id, text, Date.now());
              res.status(StatusCodes.OK);
          }
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
};