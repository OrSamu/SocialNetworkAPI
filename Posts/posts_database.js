const { StatusCodes } = require("http-status-codes");
const { readDb, writeDb } = require('../database');

const posts_list = [];

const PostStatus = {
    POSTED: 0,
    DELETED: 1,
  };

class Post {
  constructor (owner_id, text) {
    this.owner_id = owner_id;
    this.text = text;
    this.date_and_time = new Date();
    this.status = PostStatus.POSTED;
  }

  toJSON() {
    return {
      ownser_id: this.owner_id,
      text: this.text,
      date_and_time: this.date_and_time,
      status: PostStatus.POSTED,
    }
  }
}

async function create_new_post(owner_id, text) {
  const new_post = new Post(owner_id, text);
  
  // valiate data

  const post = await writeDb('posts', new_post.toJSON());

  return post;
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
  create_new_post:create_new_post,
  delete_post:delete_post
};
