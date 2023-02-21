const expressValidator = require('express-validator');
const { convert } = require('html-to-text');
const moment = require('moment');
const readingTime = require('reading-time');

const {
  addPost, getPosts, getPostById, getPostBySlug, getPostsInSameCategory
} = require('../services/postService');
const { getCategories } = require('../services/categoryService');
const { getUserById } = require('../services/userService');
const { StatusCodes } = require('../utils/httpStatusCodes');
const Post = require('../models/postModel');

const getAllPosts = async (req, res) => {

  const { code, posts } = await getPosts();
  const updatedPosts = posts.map(post => ({ ...post._doc, read_time: readingTime(post.body).text, updated: moment(post.updated).format('MMM Do, YY') }));
  res.status(code).json(updatedPosts);
};

const getPostsPage = async (req, res) => {
  const { posts } = await getPosts();
  res.render(
    'posts/posts.ejs',
    { title: 'Add Post', posts, convert }
  );
};

const getPost = async (req, res) => {
  const { slug } = req.params;
  let { post } = await getPostBySlug(slug);
  const { user } = await getUserById(post.author);
  let { postsInSameCategory } = await getPostsInSameCategory(post.category);
  postsInSameCategory = postsInSameCategory.filter((el) => el.id !== post.id);
  post = { ...post._doc, lastUpdatedDate: moment(post.updated).format('MMM Do YY') };
  res.render(
    'posts/viewPost.ejs',
    {
      title: post.title, post, author: user, convert, postsInSameCategory
    }
  );
};

const getCreatePostPage = async (req, res) => {
  const { categories } = await getCategories();
  res.render(
    'posts/post.ejs',
    { title: 'Add Post', categories }
  );
};

const createPost = async (req, res) => {
  const errors = expressValidator.validationResult(req);
  const { categories } = await getCategories();
  if (!errors.isEmpty()) {
    req.flash('error', 'Please correct the errors in the form.');
    res.render(
      'posts/post.ejs',
      { title: 'Add Post', errors: errors.array(), categories }
    );
    return;
  }
  const details = { ...req.body, author: req.user.id };
  const { code, response } = await addPost(details);
  if (code === 409) {
    const errorMessage = [{ msg: `A post with the title ${response.title} already exists!` }];
    res.render(
      'posts/post.ejs',
      { title: 'Add Post', errors: errorMessage, categories }
    );
    return;
  }
  if (code === StatusCodes.INTERNAL_SERVER_ERROR) {
    const serverErrors = [{ msg: response }];
    req.flash('error', 'Oops, something went wrong, please check the errors below');
    res.render(
      'posts/post.ejs',
      { title: 'Add Post', serverErrors, categories }
    );
    return;
  }
  res.redirect('/posts/');
};

const getUpdatePostPage = async (req, res) => {
  const statuses = ['Published', 'Draft', 'Archive'];
  const id = req.params.postId;
  const { post } = await getPostById(id);
  const { categories } = await getCategories();
  res.render(
    'posts/update.ejs',
    {
      title: 'Update Post', post, categories, statuses
    }
  );
};

const updatePost = async (req, res) => {
  const { categories } = await getCategories();
  const statuses = ['Published', 'Draft', 'Archive'];
  const id = req.params.postId;
  const { post } = await getPostById(id);
  const errors = expressValidator.validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('error', 'Please correct the errors in the form.');
    res.render(
      'posts/update.ejs',
      {
        title: 'Update Post',
        post,
        categories,
        errors: errors.array(),
        statuses
      }
    );
    return;
  }
  const updateObject = { ...req.body, featured: Boolean(req.body.featured) };
  Post.updateOne({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      req.flash('success', `${req.body.title} updated successfuly`);
      res.redirect('/posts/');
    })
    .catch((err) => {
      req.flash('error', `Server error. Please try again. ${err}`);
      res.redirect('/posts/');
    });
};

const deletePost = (req, res) => {
  const id = req.params.postId;
  Post.findByIdAndRemove(id)
    .exec()
    .then(() => {
      req.flash('success', 'Item deleted successfully.');
      res.redirect('/posts/');
    })
    .catch((err) => {
      req.flash('error', `Server error. Please try again. ${err}`);
      res.redirect('/posts/');
    });
};

module.exports = {
  getAllPosts,
  getCreatePostPage,
  createPost,
  getPostsPage,
  getUpdatePostPage,
  updatePost,
  deletePost,
  getPost
};
