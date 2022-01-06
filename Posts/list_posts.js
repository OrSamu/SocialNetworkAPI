const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("../Users/users_database");
const posts_database = require("./posts_database");


module.exports = async (req, res) => {
  try {
    const authHead = req.header("Authorization");
    const [type, token] = authHead.split(" ");
    const reader = users_database.get_user_by_token(token);
    if (reader) {
      res.send(JSON.stringify(posts_database.posts_list));
      res.status(StatusCodes.OK);
    } else {
      res.status(StatusCodes.UNAUTHORIZED);
    }
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send("Error retrieving posts list");
  }
  return;
};
