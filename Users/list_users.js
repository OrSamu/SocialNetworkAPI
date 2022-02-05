const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const { readDb } = require('../database');

module.exports = async (req, res) => {
  try {
    const users = await readDb('users');

    res.status(StatusCodes.OK);
    res.send(users.map(({ password, token, token_time_stamp, ...rest }) => rest));
  } 
  catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send("Error retrieving users list");
  }
};