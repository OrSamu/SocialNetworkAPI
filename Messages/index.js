const express = require('express');
const router = express.Router();

//const fs = require("fs").promises;

const send_message = require('./send_message');
router.post('/send_message', send_message);

const get_message = require('./get_message');
router.post('/get_message', get_message);

module.exports = router;