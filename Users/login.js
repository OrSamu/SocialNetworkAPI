const req = require("express/lib/request");
const res = require("express/lib/response");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(StatusCodes.BAD_REQUEST);
      res.send("Data is missing");
    }
    else {
      const token = await login(email, password);
      if (!token) {
        res.status(StatusCodes.UNAUTHORIZED);
        res.send("Wrong username or password");
        return;
      }
      res.status(StatusCodes.OK)
      res.send(JSON.stringify({ token: token }));
    }
  }
  catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send(`Error logging in - ${error}`);
  }
};

async function login(email, password) {
  try {
    const hash_password = users_database.hash_function(password);
    const user = users_database.users_list.find(user => {
      return user.email === email && user.password === hash_password;
    });
    if (!user || user.user_status > users_database.UserStatus.REACTIVATED) {
      return null;
    }
    users_database.create_token(user);
    return user.token;
  }
  catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send("Error logging in - " + error);
  }
  return;
}
