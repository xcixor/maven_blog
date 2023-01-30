/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
const sinon = require('sinon');
const { expect } = require('chai');
const userService = require('../../services/userService');
const userController = require('../../controllers/users');

describe('Create user', () => {
  describe('In case of success', () => {
    const response = {};
    const request = {};

    const result = {
      code: 201,
      response: {
        id: '63cf8f6f8b81f54119aa6eae'
      }
    };

    before(() => {
      request.body = {
        firstName: 'Joyce',
        lastName: 'Kim',
        email: 'j@k.com',
        isSuperUser: false,
        isStaff: true,
        password: 'paSS12358#',
        avatar: '',
        country: 'KE'
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(userService, 'addUser').resolves(result);
    });

    after(() => {
      sinon.restore();
    });

    it('Should respond with status 201 and json with "id".', async () => {
      await userController.createUser(request, response);

      expect(response.status.calledWith(result.code)).to.be.equal(true);
      expect(response.json.calledWith(result.response)).to.be.equal(true);
    });
  });
});
