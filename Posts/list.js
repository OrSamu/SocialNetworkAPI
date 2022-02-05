const { readDb } = require('../database');

module.exports = async (req, res, next) => {
    const posts = await readDb('posts');

    res.send({
        data: posts,
        total: posts.length
    });
} 