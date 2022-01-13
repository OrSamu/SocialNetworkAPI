const { StatusCodes } = require("http-status-codes");
const token_lib = require("./token");

const UserStatus = {
  ADMIN: 0,
  APPROVED: 1,
  REACTIVATED: 2,
  CREATED: 3,
  SUSPENDED: 4,
  DELETED: 5,
};

Object.freeze(UserStatus);

const users_list = [
  {
    id: 1,
    full_name: "Root",
    email: "admin",
    password: hash_function("admin"),
    user_status: UserStatus.ADMIN,
    token: null,
    token_time_stamp: null,
  },
];

let users_counter = 1;

function User(full_name, email, password) {
  this.id = ++users_counter;                            // first increasing the counter then assign the value
  this.full_name = full_name;
  this.email = email;
  this.password = hash_function(password);
  this.user_status = UserStatus.CREATED;
  this.token = null;
  this.token_time_stamp = null;
}

User.prototype.change_user_status = function (new_status) {
  if (this.id === 1) {
    throw new Error("can not change status for root user");
  }
  if (this.user_status === UserStatus.DELETED) {
    throw new Error("this user has been deleted")
  }
  if (new_status === UserStatus.ADMIN || new_status === UserStatus.CREATED) {
    throw new Error("can not change to this status")
  }
  this.user_status = new_status;
};

function hash_function(password) {
  return "new" + password + "pass";
}

function create_token(user) {
  user.token = token_lib.create_new_token();
  user.token_time_stamp = Date.now();
  return user.token;
}

function has_valid_token(user) {
  return token_lib.is_token_valid(user.token_time_stamp);
};

function create_new_user(full_name, email, password) {
  const new_user = new User(full_name, email, password);
  users_list.push(new_user);

  return new_user.id;
}

module.exports = {
  UserStatus: UserStatus,
  users_list: users_list,
  hash_function : hash_function,
  create_new_user: create_new_user,
  create_token: create_token,
  has_valid_token: has_valid_token,
};