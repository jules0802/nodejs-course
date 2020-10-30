const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('./user.model');
const usersService = require('./user.service');
const saltRounds = 10;

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  // map user fields to exclude secret fields like "password"
  res.json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    res.status(404).send('Not found');
  }
});

router.route('/').post(async (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    if (err) throw err;
    const user = await usersService.create(
      new User({ ...req.body, password: hash })
    );
    res.status(200).send(User.toResponse(user));
  });
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.sendStatus(200);
  } catch (err) {
    res.status(404).send('Not found');
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const newUser = new User({ ...req.body, _id: req.params.id });
    const user = await usersService.update(req.params.id, newUser);
    res.status(200).send(User.toResponse(user));
  } catch (err) {
    res.status(404).send('Not found');
  }
});

module.exports = router;
