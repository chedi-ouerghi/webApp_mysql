const TApplication = require('../models/TApplication');

const tapplicationControllers = {};
tapplicationControllers.getAll = (db) => (req, res) => {
  db.query('SELECT * FROM tapplication', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(results);
  });
};

tapplicationControllers.getById = (db) => (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM tapplication WHERE IdApplication = ?', id, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Application not found');
      return;
    }
    res.send(results[0]);
  });
};

tapplicationControllers.create = (db) => (req, res) => {
  const { CodeApplication, NomApplication } = req.body;
  if (!CodeApplication || !NomApplication) {
    res.status(400).send({
      message: 'CodeApplication and NomApplication can not be empty'
    });
    return;
  }
  const application = { CodeApplication, NomApplication };
  TApplication.create(db, application, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Error while creating application'
      });
      return;
    }
    res.status(201).send(data);
  });
};

tapplicationControllers.update = (db) => (req, res, next) => {
  const {  NomApplication } = req.body || {};
  if ( !NomApplication){
    res.status(400).send({
      message: 'NomApplication can not be empty'
    });
    return;
  }
  const application = {  NomApplication };
  TApplication.update(db, req.params.id, application, (err, data) => {
    if (err) {
      if (err.message === 'Application not found') {
        res.status(404).send({
          message: `Application with IdApplication ${req.params.id} not found`
        });
      } else {
        if (res && res.status) { // Add this check to avoid reading the status property of undefined
          res.status(500).send({
            message: err.message || `Error while updating application with IdApplication ${req.params.id}`
          });
        } else {
          console.log('Error while updating application with IdApplication:', req.params.id, err);
        }
      }
    } else {
      if (res) { // Add this check to avoid sending a response when res is undefined
        res.send(data);
      } else {
        console.log('Error while updating application with IdApplication:', req.params.id, 'Response object is undefined');
      }
    }
  });
};


tapplicationControllers.remove = (db) => (req, res) => {
  const id = req.params.id;
  TApplication.remove(id, db, (err, data) => {
    if (err) {
      if (err.message === 'Application not found') {
        res.status(404).send({
          message: `Application with IdApplication ${id} not found`
        });
      } else {
        res.status(500).send({
          message: err.message || `Error while deleting application with IdApplication ${id}`
        });
      }
      return;
    }
    res.send({ message: 'Application deleted successfully!' });
  });
};

tapplicationControllers.removeSelected = (db) => (req, res) => {
  const ids = req.body.ids;
  TApplication.removeSelected(ids, db, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Error while deleting applications'
      });
      return;
    }
    res.send({ message: 'Applications deleted successfully!' });
  });
};


module.exports = tapplicationControllers;
