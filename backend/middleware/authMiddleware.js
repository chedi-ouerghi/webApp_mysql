const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const pool = mysql.createPool(config.db);

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
  } else {
    jwt.verify(token, 'yourSecretKey', (err, decoded) => {
      if (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
      } else {
        const userId = decoded.userId;
        pool.query(`SELECT * FROM tUser WHERE IdUser = ${userId}`, (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
          } else if (result.length === 0) {
            res.status(401).json({ message: 'Invalid token' });
          } else {
            req.user = result[0];
            next();
          }
        });
      }
    });
  }
}

module.exports = { authenticate };
