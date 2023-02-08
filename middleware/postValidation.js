const expressValidator = require('express-validator');

const validatePost = () => [
  expressValidator.body('title').not().isEmpty().trim()
    .escape()
    .withMessage('Please provide a title'),
  expressValidator.body('body').not().isEmpty().trim()
    .escape()
    .withMessage('Please provide a body'),
  expressValidator.body('epigraph').not().isEmpty().trim()
    .escape()
    .withMessage('Please provide an epigraph'),
  expressValidator.body('category').not().isEmpty().trim()
    .escape()
    .withMessage('Please provide a category'),
];

module.exports = { validatePost };
