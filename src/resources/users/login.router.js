const router = require('express').Router();
const usersService = require('../users/user.service');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

router.route('/').post(async (req, res) => {
  const { login } = req.body;
  const users = await usersService.getAll();
  const user = users.find(userItem => userItem.login === login);
  if (login === undefined || !user) {
    res.status(403).send({
      success: false,
      message: 'Bad request: login/password mismatch'
    });
  } else {
    const token = await jwt.sign(
      { userId: user.id, login: user.login },
      JWT_SECRET_KEY,
      {
        expiresIn: 10
      }
    );
    res.send({ token });
  }
});

module.exports = router;
