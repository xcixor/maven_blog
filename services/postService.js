const Post = require('../models/postModel');
const { StatusCodes } = require('../utils/httpStatusCodes');

const getPosts = () => {
  Post.find({ sport: 'Tennis' }, 'name age', (err, posts) => {
    if (err) return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: err };
    return { code: StatusCodes.OK, response: posts };
  });
};

const addPost = async (details) => {
  const existingPost = await Post.findOne({ title: details.title });
  if (existingPost) {
    return { code: StatusCodes.CONFLICT, response: existingPost };
  }
  const { title } = await Post.create(details);
  const response = { title };
  return { code: StatusCodes.CREATED, response };
};

module.exports = { getPosts, addPost };
