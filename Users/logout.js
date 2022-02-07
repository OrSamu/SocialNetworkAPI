const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const { readDb , updateDb } = require("../database");
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
  const users = await readDb('users');
  const logout_user = users.find (user => {
    return user.token === token;
  });
  console.log("logout user:");
  console.log(logout_user);
  if(logout_user) {
    logout_user.token = null;
    logout_user.token_time_stamp = null;
    console.log("new user");
    console.log(logout_user);
    updateDb('users',logout_user);

    return true;
  }

  return false;
}