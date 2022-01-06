const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");

module.exports = async (req, res) => {
  try {
      const authHead = req.header("Authorization");
      const [type, token] = authHead.split(" ");
      if (users_database.check_user_by_token(token) === users_database.UserStatus.ADMIN ) {
        const { user_id, status_to_change} = req.body;
        if (users_database.change_user_status_by_id(user_id, status_to_change)) {
            console.log("start");
            res.status(StatusCodes.OK);
            console.log("end");
        }
        else {
            res.status(StatusCodes.UNAUTHORIZED)
        }
    }
  } 
  catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send(error);
  }
  return;
};
