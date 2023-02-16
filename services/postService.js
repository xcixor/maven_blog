const Post = require('../models/postModel');
const { StatusCodes } = require('../utils/httpStatusCodes');

const getPosts = async () => {
  const posts = await Post.find({});
  return { code: StatusCodes.SUCCESS, posts };
};

const addPost = async (details) => {
  const existingPost = await Post.findOne({ title: details.title });
  if (existingPost) {
    return { code: StatusCodes.CONFLICT, response: existingPost };
  }
  try {
    const { title } = await Post.create(details);
    const response = { title };
    return { code: StatusCodes.CREATED, response };
  } catch (error) {
    return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: error.message };
  }
};

const getPostById = async (id) => {
  try {
    const post = await Post.findById(id);
    return { code: StatusCodes.SUCCESS, post };
  } catch (error) {
    return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: error.message };
  }
};

const getPostBySlug = async (slug) => {
  try {
    const post = await Post.findOne({ slug });
    return { code: StatusCodes.SUCCESS, post };
  } catch (error) {
    return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: error.message };
  }
};

const getPostsInSameCategory = async (category) => {
  try {
    const postsInSameCategory = await Post.find({ category });
    return { code: StatusCodes.SUCCESS, postsInSameCategory };
  } catch (error) {
    return { code: StatusCodes.INTERNAL_SERVER_ERROR, response: error.message };
  }
};

module.exports = {
  getPosts, addPost, getPostById, getPostBySlug, getPostsInSameCategory
};
