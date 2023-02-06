const Post = require('../models/postModel');
const { StatusCodes } = require('../utils/httpStatusCodes');

const getPosts = () => {
  Post.find({ sport: 'Tennis' }, 'name age', (err, posts) => {
    if (err) return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: err };
    return { code: StatusCodes.OK, response: posts };
  });
};

module.exports = { getPosts };
