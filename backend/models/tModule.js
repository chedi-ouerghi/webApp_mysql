const db = require('../config/config');

const TModule = {};

TModule.getAll = (result) => {
  db.query('SELECT * FROM mydb.tmodule', (err, res) => {
    if (err) {
      console.log('Error while fetching modules:', err);
      result(err, null);
      return;
    }
    console.log('modules fetched successfully!', res);
    result(null, res);
  });
};


TModule.getById = (id, result) => {
  db.query('SELECT * FROM tmodule WHERE IdModule = ?', id, (err, res) => {
    if (err) {
      console.log('Error while fetching module with IdModule:', id, err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('module with IdModule', id, 'found successfully!');
      result(null, res[0]);
      return;
    }
    result({ message: 'module not found' }, null);
  });
};

TModule.create = (db, IdApplication, module, result) => {
  if (!db || !db.query) {
    console.error('Error: Invalid database connection');
    result(new Error('Invalid database'), null);
    return;
  }

  db.query('INSERT INTO tmodule (IdApplication, CodeModule, NomModule) VALUES (?, ?, ?)',
    [IdApplication, module.CodeModule, module.NomModule],
    (err, res) => {
      if (err) {
        console.log('Error while creating module:', err);
        result(err, null);
        return;
      }
      console.log('Module created successfully!');
      result(null, { IdModule: res.insertId, IdApplication, ...module });
    }
  );
}

TModule.update = (db, id, module, result) => {
  db.query('UPDATE tmodule SET NomModule = ? WHERE IdModule = ?', [module.NomModule, id], (err, res) => {
    if (err) {
      console.log('Error while updating module with IdModule:', id, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ message: 'Module not found' }, null);
      return;
    }
    console.log('Module updated successfully!');
    result(null, { IdModule: id, ...module });
  });
};

TModule.remove = (id, db, result) => {
  db.query('DELETE FROM tmodule WHERE IdModule = ?', id, (err, res) => {
    if (err) {
      console.log('Error while deleting Module with IdModule:', id, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ message: 'Module not found' }, null);
      return;
    }
    console.log('Module deleted successfully!');
    result(null, res);
  });
};

TModule.removeMultiple = (ids, result) => {
  db.query('DELETE FROM tmodule WHERE IdModule IN (?)', [ids], (err, res) => {
    if (err) {
      console.log('Error while deleting modules with Ids:', ids, err);
      result(err, null);
      return;
    }
    console.log(`${res.affectedRows} modules deleted successfully!`);
    result(null, res);
  });
};

module.exports = TModule;
