const { StatusCodes } = require("http-status-codes");

const posts_list = [];

let posts_counter = 0;

const PostStatus = {
    POSTED: 0,
    DELETED: 1,
  };

function Post(owner_id, text, date_and_time) {
  this.owner_id = owner_id;
  this.post_id = ++posts_counter;
  this.text = text;
  this.date_and_time = date_and_time;
  this.status = PostStatus.POSTED;
}

function create_new_post(owner_id, text, date_and_time) {
  const new_post = new Post(owner_id, text, date_and_time);
  posts_list.push(new_post);

  return new_post.post_id;
}

function get_post(post_id) {
  return posts_list.find(post => {
    return post.post_id == post_id;
  })
}

function delete_post(user_id,post_id) {
  const post_to_delete = get_post(post_id);
  if (post_to_delete.owner_id == 0 || post_to_delete.owner_id == user_id) {
    const index_of_post = posts_list.indexOf(post_to_delete);
    return posts_list.splice(index_of_post, 1);
  }
  return null;
}

module.exports = {
  posts_list : posts_list,
  posts_counter:posts_counter,
  create_new_post:create_new_post,
  delete_post:delete_post
};
