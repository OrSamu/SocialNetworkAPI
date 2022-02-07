const req = require("express/lib/request");
const res = require("express/lib/response");
const { StatusCodes } = require("http-status-codes");
const { readDb, writeDb } = require('./../database');
const users_database = require("./users_database");

module.exports = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    if (!full_name || !email || !password) {
      res.status(StatusCodes.BAD_REQUEST);
      res.send("Data is missing");
    } 
    else {
      const id = await signup(full_name, email, password);
      if(!id) {
        res.status(StatusCodes.FORBIDDEN);
        res.send("Email already being used");
        return;
      }
      res.status(StatusCodes.OK);
      res.send(JSON.stringify(id));
    }
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send(`Error signing up - ${error}`);
  }
};

async function signup(full_name,email,password) {
  try {
    const users = await readDb('users');
    const is_email_exist = users.find(user => {
      return user.email === email;
    });
    if(is_email_exist) {
      return null;
    }
    else {
      const user = users_database.create_new_user(full_name,email,password);
      const id = (await writeDb('users', user)).id;

      return id;
    }
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send(`Error signing up - ${error}`);
  }
}