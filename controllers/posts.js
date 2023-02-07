const { addPost } = require('../services/postService');

const getCreatePostPage = (req, res) => {
  res.render(
    'posts/post.ejs',
    { title: 'Add Post' }
  );
};

const createPost = async (req, res) => {
  const { code, response } = await addPost(req.body);
  if (code === 409) {
    const errorMessage = [{ msg: `A post with the title ${response.title} already exists!` }];
    res.render(
      'posts/post.ejs',
      { title: 'Add Post', errors: errorMessage }
    );
    return;
  }
  res.redirect('/');
};

module.exports = { getCreatePostPage, createPost };
