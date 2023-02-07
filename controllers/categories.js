const { addCategory } = require('../services/categoryService');

const getCreateCategoryPage = (req, res) => {
  res.render(
    'categories/category.ejs',
    { title: 'Add Category' }
  );
};

const createCategory = async (req, res) => {
  const { code, response } = await addCategory(req.body);
  if (code === 409) {
    const errorMessage = [{ msg: `A category with the title ${response.title} already exists!` }];
    res.render(
      'categories/category.ejs',
      { title: 'Add category', errors: errorMessage }
    );
    return;
  }
  res.redirect('/categories/');
};

module.exports = { getCreateCategoryPage, createCategory };
