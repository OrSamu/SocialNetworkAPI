const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");

module.exports = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const result = await logout(token);
    if(result) {
      res.status(StatusCodes.OK);
      return res.send("");  
    }
      res.status(StatusCodes.FORBIDDEN);
      return res.send("user wasn't logged in");
  }
   catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send("Error logging in - " + error);
  }
};

async function logout(token) {
  user_to_logout = users_database.users_list.find (user => {
    return user.token === token;
  });
  if(user_to_logout) {
    user_to_logout.token = null;
    user_to_logout.token_time_stamp = null;
    return true;
  }
  return false;
}