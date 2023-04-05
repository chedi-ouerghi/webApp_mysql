// const db = require('../config/config');

const TApplication = {};

TApplication.getAll = (result) => {
  db.query('SELECT * FROM tapplication', (err, res) => {
    if (err) {
      console.log('Error while fetching applications:', err);
      result(err, null);
      return;
    }
    console.log('Applications fetched successfully!');
    result(null, res);
  });
};

TApplication.getById = (id, result) => {
  db.query('SELECT * FROM tapplication WHERE IdApplication = ?', id, (err, res) => {
    if (err) {
      console.log('Error while fetching application with IdApplication:', id, err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('Application with IdApplication', id, 'found successfully!');
      result(null, res[0]);
      return;
    }
    result({ message: 'Application not found' }, null);
  });
};

TApplication.create = (db, application, result) => {
  // Vérifier si une application avec le même CodeApplication existe déjà
  db.query('SELECT * FROM tapplication WHERE CodeApplication = ?', [application.CodeApplication], (err, res) => {
    if (err) {
      console.log('Error while checking for existing application:', err);
      result(err, null);
      return;
    }
    if (res.length > 0) {
      // Une application avec le même CodeApplication existe déjà
      result(new Error('Le code application existe déjà'), null);
      return;
    }
    // Aucune application avec le même CodeApplication n'existe, on peut l'insérer
    db.query('INSERT INTO tapplication SET ?', application, (err, res) => {
      if (err) {
        console.log('Error while creating application:', err);
        result(err, null);
        return;
      }
      console.log('Application created successfully!');
      result(null, { IdApplication: res.insertId, ...application });
    });
  });
};


TApplication.update = (db, id, application, result) => {
  db.query('UPDATE tapplication SET  NomApplication = ? WHERE IdApplication = ?',
   [ application.NomApplication, id], (err, res) => {
    if (err) {
      console.log('Error while updating application with IdApplication:', id, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ message: 'Application not found' }, null);
      return;
    }
    console.log('Application updated successfully!');
    result(null, { IdApplication: id, ...application });
  });
};


TApplication.remove = (id, db, result) => {
  db.query('DELETE FROM tapplication WHERE IdApplication = ?', id, (err, res) => {
    if (err) {
      console.log('Error while deleting application with IdApplication:', id, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ message: 'Application not found' }, null);
      return;
    }
    console.log('Application deleted successfully!');
    result(null, res);
  });
};
TApplication.removeMultiple = (ids, db, result) => {
  db.query('DELETE FROM tapplication WHERE IdApplication IN (?)', [ids], (err, res) => {
    if (err) {
      console.log('Error while deleting applications with Ids:', ids, err);
      result(err, null);
      return;
    }
    console.log(`${res.affectedRows} applications deleted successfully!`);
    result(null, res);
  });
};



module.exports = TApplication;
