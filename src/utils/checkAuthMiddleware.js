const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../common/config');

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      await jwt.verify(token, JWT_SECRET_KEY, err => {
        if (err) {
          res.status(401).send({ success: false, message: 'Unauthorized' });
        } else {
          next();
          return;
        }
      });
    } else {
      res.status(401).send({ success: false, message: 'Unauthorized' });
    }
  } else {
    res.status(401).send({ success: false, message: 'Unauthorized' });
  }
};
