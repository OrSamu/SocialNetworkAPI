const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const { UserStatus } = require("./users_database");
const users_database = require("./users_database");

module.exports = async (req, res) => {
  try {
    const authHead = req.header("Authorization");
    const [type, token] = authHead.split(" ");
    if (users_database.check_user_by_token(token) === UserStatus.ADMIN ) {
      res.send(JSON.stringify(users_database.users_list));
      res.status(StatusCodes.OK);
    } else {
      res.status(StatusCodes.UNAUTHORIZED);
    }
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send("Error retrieving users list");
  }
  return;
};
