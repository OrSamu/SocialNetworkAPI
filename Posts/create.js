const { create_new_post } = require('./posts_database');
const { StatusCodes } = require("http-status-codes");

module.exports = async (req, res, next) => {
    const { text } = req.body;
    const { id } = req.user;

    const post = await create_new_post(id, text);

    res
        .status(StatusCodes.CREATED)
        .send(post);
} 