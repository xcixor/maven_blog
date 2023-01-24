const expressValidator = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        expressValidator.body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
        expressValidator.body('password').isLength({ min: 8 }),
        expressValidator.body('firstName').not().isEmpty().trim()
          .escape()
          .withMessage('Firstname is required'),
        expressValidator.body('lastName').not().isEmpty().trim()
          .escape(),
        expressValidator.body('country').not().isEmpty().trim()
          .escape(),
        expressValidator.body('isSuperUser').toBoolean(),
        expressValidator.body('isStaff').toBoolean()
      ];
    }
    default:
      return [];
  }
};

module.exports = validate;
