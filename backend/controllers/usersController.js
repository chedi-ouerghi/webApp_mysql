const Tuser = require('../models/tuser');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const tuserControllers = {};

tuserControllers.getAll = (db) => (req, res) => {
    db.query('select * from select_user ', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(results);
  });
};

tuserControllers.getById = (db) => (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM tuser WHERE IdUser = ?', id, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('user not found');
      return;
    }
    res.send(results[0]);
  });
};

tuserControllers.create = (db) => (req, res) => {
  const { IdApplication, IdModule, IdPage, IdUser, NomUser, PrenomUser, Email, Photo, Role } = req.body;
  if (!IdApplication || !IdModule || !IdPage || !IdUser || !NomUser || !PrenomUser || !Email || !Photo || !Role ) {
    res.status(400).send({
      message: 'IdApplication, IdModule, and IdUser  cannot be empty'
    });
    return;
  }
  const user = { IdApplication, IdModule, IdPage, IdUser, NomUser, PrenomUser, Email, Photo, Role};
  Tuser.create(db, user, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Error while creating user'
      });
      return;
    }
    console.log('user created successfully!', data);
    res.status(201).send(data);
  });
};

tuserControllers.update = (db) => [
  upload.single('Photo'),
  (req, res) => {
    const { NomUser, PrenomUser, Email } = req.body || {};
    if (!NomUser || !PrenomUser || !Email) {
      res.status(400).send({
        message: 'NomUser, PrenomUser and Email can not be empty'
      });
      return;
    }
    const user = { NomUser, PrenomUser, Email };
    if (req.file) {
      user.Photo = req.file.path;
    }
    Tuser.update(db, req.params.id, user, (err, data) => {
      if (err) {
        if (err.message === 'user not found') {
          res.status(404).send({
            message: `user with IdUser ${req.params.id} not found`
          });
        } else {
          res.status(500).send({
            message: err.message || `Error while updating user with IdUser ${req.params.id}`
          });
        }
      } else {
        res.send(data);
      }
    });
  }
];


tuserControllers.remove = (db) => (req, res) => {
const id = req.params.id;
  Tuser.remove(db, id, (err, result) => {
     if (err) {
      if (err.message === 'user not found') {
        res.status(404).send({
          message: `user with Iduser ${id} not found`
        });
      } else {
        res.status(500).send({
          message: err.message || `Error while deleting user with Iduser ${id}`
        });
      }
      return;
    }
    res.send({ message: 'user deleted successfully!' });
  });
};

module.exports = tuserControllers;