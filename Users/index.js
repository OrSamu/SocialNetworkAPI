const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const users_database = require('./users_database')

//const fs = require("fs").promises;

const signup = require('./signup');
router.post('/signup', signup);

const login = require('./login');
router.post('/login', login);

const logout = require('./logout');
router.post('/logout',auth.auth_by_role(users_database.UserStatus.REACTIVATED),logout);

const list_users = require('./list_users');
router.get('/list_users', auth.auth_by_role(users_database.UserStatus.ADMIN), list_users);

const change_status = require('./change_status');
router.post('/change_status', auth.auth_by_role(users_database.UserStatus.ADMIN), change_status);

module.exports = router;