const UserStatus = {
    ADMIN: 0,
    CREATED: 1,
    APPROVED: 2,
    SUSPENDED: 3,
    REACTIVATED: 4,
    DELETED: 5
 };

 Object.freeze(UserStatus);

 const users_list = [
     {
        id : 1,
        full_name : 'Root',
        email : 'admin',
        password : ssh_function("admin"),
        user_status : UserStatus.ADMIN,
        token : undefined,
        token_time_stamp : undefined
     }
 ];

 let users_counter = 2;

function User(full_name, email, password) { 
    this.id = get_new_id();
    this.full_name = full_name;
    this.email = email;
    this.password = ssh_function(password);
    this.user_status = UserStatus.CREATED;
    this.token = undefined;
    this.token_time_stamp = undefined;
}

User.prototype.change_user_status = function (new_status) {
    this.user_status = new_status;
}

function get_new_id() {
    const id_to_return = users_counter;
    users_counter++;
    return id_to_return;
}

function ssh_function(password) {
    return "new" + password + "pass";
}

function create_new_user(full_name, email, password) {
    const new_user = new User(full_name, email, password);
    users_list.push(new_user);
    return new_user.id;
}

function is_email_used() {
    return false;
}

module.exports = {
    UserStatus : UserStatus,
    users_counter : users_counter,
    users_list : users_list,
    create_new_user : create_new_user,
    is_email_used: is_email_used
}


