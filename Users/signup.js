const req = require("express/lib/request");
const { StatusCodes } = require("http-status-codes");
const users_database = require("./users_database");

module.exports = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    if (!full_name || !email || !password) {
      res.status(StatusCodes.BAD_REQUEST);
      res.send("Data is missing");
    } else {
      const id_obj = { id : await signup(full_name, email, password)};
      if(!id_obj.id) {
        res.status(StatusCodes.FORBIDDEN);
        res.send("Email already being used");
        return;
      }
      res.status(StatusCodes.OK);
      res.send(JSON.stringify(id_obj));
    }
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY);
    res.send(`Error signing up - ${error}`);
  }
};

async function signup(full_name,email,password) {
  const used_email = users_database.users_list.find(user => {
    return user.email === email && user.password === hash_password;
  });
  if(used_email) {
    return null;
  }
  return users_database.create_new_user(full_name, email, password);
}