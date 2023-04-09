const db = require('../config/config');

const TPage = {};


TPage.getAll = (result) => {
  db.query('SELECT * FROM mydb.tpage', (err, res) => {
    if (err) {
      console.log('Error while fetching modules:', err);
      result(err, null);
      return;
    }
    console.log('modules fetched successfully!', res);
    result(null, res);
  });
};

TPage.getById = (db, IdApplication, IdModule, IdPage, result) => {
  db.query('SELECT * FROM tpage WHERE IdApplication = ? AND IdModule = ? AND IdPage = ?', [IdApplication, IdModule, IdPage], (err, res) => {
    if (err) {
      console.log('Error retrieving page with IdApplication', IdApplication, 'IdModule', IdModule, 'IdPage', IdPage, err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('Page with IdApplication', IdApplication, 'IdModule', IdModule, 'IdPage', IdPage, 'found successfully!');
      result(null, res[0]);
      return;
    }
    result({ message: 'Page not found' }, null);
  });
};


TPage.create = (db, page, result) => {
  db.query('INSERT INTO tpage (IdApplication, IdModule, NomPage) VALUES (?, ?, ?)',
    [page.IdApplication, page.IdModule, page.NomPage], (err, res) => {
    if (err) {
      console.log('Error creating page', err);
      result(err, null);
      return;
    }
    console.log('Page created successfully!');
    result(null, { IdApplication: page.IdApplication, IdModule: page.IdModule, IdPage: res.insertId, NomPage: page.NomPage });
  });
};

TPage.update = (db, id, page, result) => {
  console.log('Updating page with ID:', id);
  const query = `UPDATE tpage SET NomPage = ? WHERE IdPage = ?`;
  db.query(query, [page.NomPage, id], (err, res) => {
    if (err) {
      console.log('Error updating page:',id, err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      console.log('Page not found');
      result({ message: 'Page non trouvée' }, null);
      return;
    }

    console.log('Page updated successfully');
    result(null, { IdPage: id, ...page });
  });
};





TPage.remove = (db,id, result) => {
  db.query('DELETE FROM tpage WHERE  IdPage = ?', id, (err, res) => {
    if (err) {
      console.log('Error while deleting page with IdPage:', id, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ message: 'page not found' }, null);
      return;
    }
    console.log('page deleted successfully!');
    result(null, res);
  });
};
module.exports = TPage;
