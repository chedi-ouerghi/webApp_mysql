const tModule = require('../models/tModule');

const tmoduleControllers = {};

tmoduleControllers.getAll = (db) => (req, res) => {
  // db.query('SELECT tapplication.IdApplication, tApplication.NomApplication, IdApplication,IdModule, CodeModule, NomModule FROM tmodule, tapplication where tapplication.IdApplication = tModule.IdApplication ', (err, results) => {
    db.query('select * from select_module ', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(results);
  });
};

tmoduleControllers.getById = (db) => (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM tmodule WHERE IdModule = ?', id, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('module not found');
      return;
    }
    res.send(results[0]);
  });
};

tmoduleControllers.create = (db) => (req, res) => {
  const { CodeModule, NomModule, IdApplication } = req.body;
  if (!CodeModule || !NomModule || !IdApplication) {
    res.status(400).send({
      message: 'CodeModule, NomModule, and IdApplication can not be empty'
    });
    return;
  }
  const module = { CodeModule, NomModule };
  tModule.create(db, IdApplication, module, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Error while creating module'
      });
      return;
    }
    console.log('Module created successfully!', data);
    res.status(201).send(data);
  });
};

tmoduleControllers.update = (db) => (req, res) => {
  const { NomModule} = req.body || {};
  if (!NomModule ) {
    res.status(400).send({
      message: 'NomModule  can not be empty'
    });
    return;
  }
  const module = { NomModule };
  tModule.update(db, req.params.id, module, (err, data) => {
    if (err) {
      if (err.message === 'module not found') {
        res.status(404).send({
          message: `module with IdModule ${req.params.id} not found`
        });
      } else {
        res.status(500).send({
          message: err.message || `Error while updating module with IdModule ${req.params.id}`
        });
      }
    } else {
      res.send(data);
    }
  });
};

tmoduleControllers.remove = (db) => (req, res) => {
  const id = req.params.id;
  tModule.remove(id, db, (err, data) => {
    if (err) {
      if (err.message === 'module not found') {
        res.status(404).send({
          message: `module with IdModule ${id} not found`
        });
      } else {
        res.status(500).send({
          message: err.message || `Error while deleting module with IdModule ${id}`
        });
      }
      return;
    }
    res.send({ message: 'module deleted successfully!' });
  });
};


module.exports = tmoduleControllers;