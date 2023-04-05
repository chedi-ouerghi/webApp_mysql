// middleware/authenticateUser.js

const { Login, User } = require('../models');

async function authenticateUser(req, res, next) {
  const { login, password } = req.body;

  try {
    const loginInstance = await Login.findOne({
      where: { Login: login },
      include: User,
    });

    if (!loginInstance || loginInstance.Password !== password) {
      res.status(401).json({ message: 'Invalid login or password' });
      return;
    }

    req.user = loginInstance.User;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while authenticating the user' });
  }
}

module.exports = authenticateUser;
