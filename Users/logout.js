const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");

module.exports = async (req, res) => {
  try {
    const authHead = req.header("Authorization");
    const [type, token] = authHead.split(" ");
    if (users_database.check_user_by_token(token) < UserStatus.CREATED ) {
    log_user_out_by_token(token);
    res.status(StatusCodes.OK);
    }
    else {
        res.StatusCodes(StatusCodes.UNAUTHORIZED)
    }
}
   catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send("Error logging in - " + error);
  }
  return;
};
