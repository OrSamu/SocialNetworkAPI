const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");
const { readDb, updateDb } = require('./../database');

module.exports = async (req, res) => {
  try {
    const { user_id, new_status } = req.body;
    if (!user_id || !new_status || new_status < users_database.UserStatus.APPROVED || new_status > users_database.UserStatus.SUSPENDED) {
      res.status(StatusCodes.BAD_REQUEST);
      res.send("Data is missing");
      return;
    }
    else {
      const result = await change_status(user_id, new_status);
      if (!result) {
        res.status(StatusCodes.BAD_REQUEST);
        return res.send("Data is missing");
      }
      res.status(StatusCodes.OK);
      res.send(JSON.stringify({Result : "Success"}));
    }
  }
  catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send(`Error changing user status - ${error}`);
  }
};

async function change_status(id_to_update, new_status) {
  const users = await readDb('users');
  const user = users.find(user => {
    return (user.id === id_to_update);});

  if(user && user.id != 1 && 
    user.user_status != users_database.UserStatus.DELETED) {
    user.user_status = new_status;
    updateDb('users', user);

    return true;
  }

  return false;
}
