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

TPage.getById = (id, result) => {
  db.query('SELECT * FROM tpage WHERE IdPage = ?', id, (err, res) => {
    if (err) {
      console.log('Erreur lors de la récupération de la page avec l\'IdPage', id, err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('module with l\'IdPage', id, 'found successfully!');
      result(null, res[0]);
      return;
    }
    result({ message: 'Page non trouvée' }, null);
  });
};

TPage.create = (db, IdApplication, IdModule,page, result) => {
  if (!db || !db.query) {
    console.error('Erreur: Connexion à la base de données invalide');
    result(new Error('Base de données invalide'), null);
    return;
  }

  db.query('INSERT INTO tpage (IdApplication, IdModule, NomPage) VALUES (?, ?, ?)',
    [IdApplication, IdModule, page.NomPage],
    (err, res) => {
      if (err) {
        console.log('Erreur lors de la création de la page:', err);
        result(err, null);
        return;
      }
      console.log('Page créée avec succès!');
      result(null, { IdPage: res.insertId, IdApplication, IdModule, ...page });
    }
  );
};

TPage.update = (db, IdApplication, IdModule, id, page, result) => {
  db.query('UPDATE tpage SET NomPage = ? WHERE IdApplication = ? AND IdModule = ? AND IdPage = ?',
    [page.NomPage, IdApplication, IdModule, id],
    (err, res) => {
      if (err) {
        console.log('Erreur lors de la mise à jour de la page avec l\'IdPage:', id, err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ message: 'Page non trouvée' }, null);
        return;
      }
      console.log('Page mise à jour avec succès!');
      result(null, { IdPage: id, IdApplication, IdModule, ...page });
    }
  );
};


TPage.remove = (db, IdApplication, IdModule, id, result) => {
  db.query('DELETE FROM tpage WHERE IdApplication = ? AND IdModule = ? AND IdPage = ?', 
    [IdApplication, IdModule, id], 
    (err, res) => {
      if (err) {
        console.log('Erreur lors de la suppression de la page avec l\'IdPage:', id, err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ message: 'Page non trouvée' }, null);
        return;
      }
      console.log('Page supprimée avec succès!');
      result(null, res);
    }
  );
};
module.exports = TPage;
