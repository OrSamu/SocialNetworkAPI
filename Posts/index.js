const express = require('express');
const router = express.Router();

//const fs = require("fs").promises;

const publish = require('./publish');
router.post('/publish', publish);

const delete_post = require('./delete');
router.post('/delete', delete_post);

const list_posts = require('./list_posts');
router.get('/list_posts', list_posts);

module.exports = router;