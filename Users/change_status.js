const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const { change_user_status_by_id } = require("./users_database");
const users_database = require("./users_database");

module.exports = async (req, res) => {
  try {
    const { user_id, new_status } = req.body;
    if (!user_id || !new_status) {
      res.status(StatusCodes.BAD_REQUEST);
      res.send("Data is missing");
      return;
    }
    const result = await change_status(user_id, new_status);
    if (!result) {
      res.status(StatusCodes.BAD_REQUEST);
      return res.send("Data is missing");
    }
    res.status(StatusCodes.OK);
    res.send(JSON.stringify({Result : "Success"}));
  }
  catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send(`Error changing user status - ${error}`);
  }
};

async function change_status(user_id, new_status) {
  const user = users_database.users_list.find(user => {
    return (user.id == user_id);
  });
  if (user) {
    user.change_user_status(new_status);
    return true;
  }
  return false;
} 
