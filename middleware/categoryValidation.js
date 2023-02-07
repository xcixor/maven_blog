const expressValidator = require('express-validator');

const validateCategory = () => [
  expressValidator.body('title').not().isEmpty().trim()
    .escape()
    .withMessage('Please provide a title'),
  expressValidator.body('description').not().isEmpty().trim()
    .escape()
    .withMessage('Please provide a description'),

];

module.exports = { validateCategory };
