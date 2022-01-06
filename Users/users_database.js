const { StatusCodes } = require("http-status-codes");

const UserStatus = {
  ADMIN: 0,
  APPROVED: 1,
  REACTIVATED: 2,
  CREATED: 3,
  SUSPENDED: 4,
  DELETED: 5,
};

Object.freeze(UserStatus);

const milliseconds_in_quarter_hour = 900000;

const users_list = [
  {
    id: 1,
    full_name: "Root",
    email: "admin",
    password: hash_function("admin"),
    user_status: UserStatus.ADMIN,
    token: undefined,
    token_time_stamp: undefined,
  },
];

let users_counter = 2;

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

function User(full_name, email, password) {
  this.id = get_new_id();
  this.full_name = full_name;
  this.email = email;
  this.password = hash_function(password);
  this.user_status = UserStatus.CREATED;
  this.token = null;
  this.token_time_stamp = null;
}

User.prototype.change_user_status = function (new_status) {
  this.user_status = new_status;
};

function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function get_new_id() {
  const id_to_return = users_counter;
  users_counter++;
  return id_to_return;
}

function hash_function(password) {
  return "new" + password + "pass";
}

function create_new_user(full_name, email, password) {
  const new_user = new User(full_name, email, password);
  users_list.push(new_user);

  return new_user.id;
}

//function will return user status so the system will know what type of user tried to access
function check_user_by_token(token_to_check) {
  const user_being_checked = users_list.find((user) => {
    return user.token === token_to_check && is_token_valid(user);
  });
  if (user_being_checked) {
    return user_being_checked.user_status;
  }
  return UserStatus.DELETED;
}

function get_user_by_token(token_to_check) {
    const user_being_checked = users_list.find((user) => {
      return user.token === token_to_check && is_token_valid(user);
    });
    if (user_being_checked) {
      return user_being_checked;
    }
    return null;
  }

function authentication(email, password) {
  const hash_password = hash_function(password);
  const is_user_exist = users_list.find((user) => {
    return user.email === email && user.password === hash_password;
  });
  if (is_user_exist) {
    if (is_user_exist.user_status < UserStatus.CREATED) {
      create_token(is_user_exist);
      return is_user_exist.token;
    } else {
      return -1;
    }
  } else {
    return null;
  }
}

function create_token(logging_in_user) {
  if (!is_token_valid(logging_in_user)) {
    logging_in_user.token = generateString(10);
    logging_in_user.token_time_stamp = Date.now();
  }
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
}


module.exports = {
  UserStatus: UserStatus,
  users_list: users_list,
  create_new_user: create_new_user,
  authentication: authentication,
  check_user_by_token: check_user_by_token,
  get_user_by_token:get_user_by_token,
  change_user_status_by_id: change_user_status_by_id,
};
