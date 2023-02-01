const expressValidator = require('express-validator');

const validateUser = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        expressValidator.body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
        expressValidator.body('password')
          .isLength({ min: 8 })
          .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
          .withMessage('Please provide a strong password.')
      ];
    }
    default:
      return [];
  }
};

module.exports = { validateUser };
