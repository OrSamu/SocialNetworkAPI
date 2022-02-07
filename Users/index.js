const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth');
const signup = require('./signup');
const login = require('./login');
const logout = require('./logout');
const list_users = require('./list_users');
const change_status = require('./change_status');
const { UserStatus } = require('./users_database');

//const fs = require("fs").promises;

router.post('/signup', signup);
router.put('/login', login);
router.put('/logout', authenticate, logout);
router.get('/list_users',
     [
         authenticate,
         authorize(UserStatus.ADMIN)
     ],
     list_users
);
router.put('/change_status',
     [
         authenticate,
         authorize(UserStatus.ADMIN)
     ]
, change_status);

module.exports = router;
