const jwt = require('jsonwebtoken');
const { compareSync } = require('bcrypt');
const { getUserByEmail } = require('../utils/userDBUtils');

const jwtLogin = async (req, res) => {
  const { code, response } = (await getUserByEmail(req.body.email));
  if (response == null) {
    return res.status(code).send({ message: 'No user with that email found.' });
  }
  try {
    if (!compareSync(req.body.password, response.password)) {
      return res.status(401).send({ message: 'Password incorrect.' });
    }
    const body = { id: response._id, email: response.email };
    const token = jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET);
    return res.status(200).send({ token: `Bearer ${token}` });
  } catch (error) {
    return res.status(403).send(error);
  }
};

module.exports = { jwtLogin };
