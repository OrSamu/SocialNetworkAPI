const express = require('express');
const router = express.Router();

const create = require('./create');
const read = require('./read');
const destroy = require('./destroy');
const update = require('./update');
const list = require('./list');

/**
 * List
 */
router.get('/', list)

/**
 * Show
 */
router.get('/:id', read);

/**
 * Create
 */
router.post('/', create)

/**
 * UPDATE
 */
router.put('/:id',  update)

/**
 * Delete
 */
router.delete('/:id', destroy);

module.exports = router;