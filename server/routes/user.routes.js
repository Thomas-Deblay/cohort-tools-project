const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../data/User.model');

const { isAuthenticated } = require('../middleware/jwt.middleware');

// GET A SPECIFIC BY ID / GET-------
router.get('/users/:id', isAuthenticated, (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((userFromDB) => {
      res.status(200).json(userFromDB);
    })
    .catch((e) => {
      next(e);
    });
});
// end ---

module.exports = router;
