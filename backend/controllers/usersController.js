// controllers/usersController.js

const { User } = require('../models');

async function createUser(req, res) {
  const { nomUser, prenomUser, email, photo, role } = req.body;

  try {
    const user = await User.create({ NomUser: nomUser, PrenomUser: prenomUser, Email: email, Photo: photo, Role: role });

    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the user' });
  }
}

module.exports = { createUser };
