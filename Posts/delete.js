const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("../Users/users_database");
const posts_database = require("./posts_database");


module.exports = async (req, res) => {
  try {
      const authHead = req.header("Authorization");
      const [type, token] = authHead.split(" ");
      const deleter = users_database.get_user_by_token(token);
      const { post_id } = req.body;

      if (deleter && post_id > 0 && post_id <= posts_database.posts_counter) {

          const result = posts_database.delete_post(deleter.id,post_id);
          res.status(StatusCodes.OK);
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