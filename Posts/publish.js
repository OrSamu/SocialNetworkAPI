const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("../Users/users_database");
const posts_database = require("./posts_database");


module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { post_text } = req.body;
    const post_id = await post(token, post_text);
    if (!post_id) {
      res.status(StatusCodes.UNAUTHORIZED);
      return res.send("failed to post");
    }
    res.status(StatusCodes.OK);
    return res.send(JSON.stringify({ post_id: post_id }));
  }
  catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send("Error retrieving users list");
  }
  return;
};

async function post(token, text) {
  posting_user = users_database.users_list.find(user => {
    return user.token === token;
  });
  if (!posting_user) {
    return null;
  }
  return posts_database.create_new_post(posting_user.id, text,)
}