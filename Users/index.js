const express = require('express');
const router = express.Router();

//const fs = require("fs").promises;

const signup = require('./signup');
router.post('/signup', signup);

const login = require('./login');
router.post('/login', login);

const logout = require('./logout');
router.post('/logout', logout);

const list_users = require('./list_users');
router.get('/list_users', list_users);

const change_user_status = require('./change_user_status');
router.post('/change_user_status', change_user_status);

module.exports = router;