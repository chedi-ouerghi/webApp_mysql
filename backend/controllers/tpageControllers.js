const TPage = require('../models/tPages');

const tpageControllers = {};

tpageControllers.getAll = (db) => (req, res) => {
    db.query('select * from select_page ', (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(results);
  });
};

tpageControllers.getById = (db) => (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM tpage WHERE IdPage = ?', id, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('page not found');
      return;
    }
    res.send(results[0]);
  });
};

tpageControllers.create = (db) => (req, res) => {
  const { IdApplication, IdModule, NomPage } = req.body;
  if (!IdApplication || !IdModule || !NomPage) {
    res.status(400).send({
      message: 'IdApplication, IdModule, and NomPage cannot be empty'
    });
    return;
  }
  const page = { IdApplication, IdModule, NomPage };
  TPage.create(db, page, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Error while creating page'
      });
      return;
    }
    console.log('Page created successfully!', data);
    res.status(201).send(data);
  });
};

tpageControllers.update = (db) => (req, res) => {
  const { NomPage} = req.body || {};
  if (!NomPage ) {
    res.status(400).send({
      message: 'NomPage  can not be empty'
    });
    return;
  }
  const page = { NomPage };
  TPage.update(db, req.params.id, page, (err, data) => {
    if (err) {
      if (err.message === 'page not found') {
        res.status(404).send({
          message: `page with Idpage ${req.params.id} not found`
        });
      } else {
        res.status(500).send({
          message: err.message || `Error while updating page with IdPage ${req.params.id}`
        });
      }
    } else {
      res.send(data);
    }
  });
};


tpageControllers.remove = (db) => (req, res) => {
const id = req.params.id;
  TPage.remove(db, id, (err, result) => {
     if (err) {
      if (err.message === 'Page not found') {
        res.status(404).send({
          message: `Page with IdPage ${id} not found`
        });
      } else {
        res.status(500).send({
          message: err.message || `Error while deleting Page with IdPage ${id}`
        });
      }
      return;
    }
    res.send({ message: 'Page deleted successfully!' });
  });
};


module.exports = tpageControllers;