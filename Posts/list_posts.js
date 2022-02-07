const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("../users/users_database");
const posts_database = require("./posts_database");


module.exports = async (req, res) => {
  try {
    res.status(StatusCodes.OK);
    return res.send(JSON.stringify(await list_posts()));
  } 
  catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send("Error retrieving users list");
  }
};

async function list_posts() {
  const listing_posts = posts_database.filter_posts((post) => {post.status === posts_database.PostStatus.POSTED});
  return listing_posts;
}
