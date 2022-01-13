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

//function will return user status so the system will know what type of user tried to access
/*function check_user_by_token(token_to_check) {
  const user_being_checked = users_list.find((user) => {
    return user.token === token_to_check && is_token_valid(user);
  });
  if (user_being_checked) {
    return user_being_checked.user_status;
  }
  return UserStatus.DELETED;
}



function is_token_valid(logging_in_user) {
  const current_time = Date.now();
  if (logging_in_user.token === null) {
    return false;
  } else {
    return (
      current_time - logging_in_user.token_time_stamp <
      milliseconds_in_quarter_hour
    );
  }
}

function log_user_out_by_token(user_token) {
  const is_user_exist = users_list.find((user) => {
    return user.token === user_token;
  });
  if (is_user_exist) {
    is_user_exist.token = null;
    is_user_exist.token_time_stamp = null;
    return 1;
  }
  return -1;
}

function is_valid_status(status_to_check) {
    return status_to_check > UserStatus.ADMIN && status_to_check <= UserStatus.DELETED;
}

function change_user_status_by_id(user_id, new_status) {
    const is_user_exist = users_list.find(user => {
        return user.id == user_id;
    })
    const should_change_status = (is_user_exist &&
        (is_user_exist.user_status != UserStatus.DELETED) &&
        (is_user_exist.user_status != new_status) &&
        is_valid_status(new_status));
    if (should_change_status) {
        is_user_exist.user_status = parseInt(new_status);
        return true;
    }
    return false;
}*/

module.exports = {
  UserStatus: UserStatus,
  users_list: users_list,
  hash_function : hash_function,
  create_new_user: create_new_user,
  create_token: create_token,
  has_valid_token: has_valid_token,
};