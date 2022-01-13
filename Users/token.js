const milliseconds_in_quarter_hour = 900000;
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

function create_new_token() {
    return generate_random_string(10);
}

function generate_random_string(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function is_token_valid(token_time_stamp) {
  return ((Date.now() - token_time_stamp) <= milliseconds_in_quarter_hour);
}

module.exports = {
  create_new_token : create_new_token,
  is_token_valid : is_token_valid
};
