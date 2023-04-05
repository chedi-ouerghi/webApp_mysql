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
  TPage.getById(db, req.params.IdApplication, req.params.IdModule, req.params.IdPage, (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(result);
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
  const { IdApplication, IdModule, NomPage } = req.body;
  if (!IdApplication || !IdModule || !NomPage) {
    res.status(400).send({
      message: 'IdApplication, IdModule, and NomPage cannot be empty'
    });
    return;
  }
  const page = { IdApplication, IdModule, NomPage };
TPage.update(db, req.params.IdApplication, req.params.IdModule, req.params.IdPage, page, (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(result);
  });
};

tpageControllers.remove = (db) => (req, res) => {
  TPage.remove(db, req.params.IdApplication, req.params.IdModule, req.params.IdPage, (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).send('Error executing query');
      return;
    }
    res.send(result);
  });
};

module.exports = tpageControllers;
