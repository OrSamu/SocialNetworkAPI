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

 const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

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

User.prototype.create_token = function () {
    this.token = generateString(10);
    this.token_time_stamp = Date.now();
}

// program to generate random strings

// declare all characters

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
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

function authentication(email,ssh_password) {
    const token = null;
    users_list.forEach((user) => {
        if(email === user.email && ssh_password === user.password){
            result = user.create_token();
        }
    })

    return result;
}

module.exports = {
    UserStatus : UserStatus,
    users_counter : users_counter,
    users_list : users_list,
    create_new_user : create_new_user,
    ssh_function : ssh_function,
    authentication : authentication
}