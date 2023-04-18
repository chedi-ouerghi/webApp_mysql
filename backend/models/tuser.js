const db = require('../config/config');

const Tuser = {};


Tuser.getAll = (result) => {
  db.query('SELECT * FROM mydb.tuser', (err, res) => {
    if (err) {
      console.log('Error while fetching users:', err);
      result(err, null);
      return;
    }
    console.log('users fetched successfully!', res);
    result(null, res);
  });
};

Tuser.getById = (db, IdUser, IdApplication, IdModule, IdPage, result) => {
  db.query('SELECT * FROM tuser WHERE IdApplication = ? AND IdModule = ? AND IdPage = ?  AND IdUser = ?', [IdApplication, IdModule, IdPage,IdUser], (err, res) => {
    if (err) {
      console.log('Error retrieving user with IdApplication', IdApplication, 'IdModule', IdModule, 'IdPage', IdPage,'IdUser',IdUser, err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log('user with IdApplication', IdApplication, 'IdModule', IdModule, 'IdPage', IdPage,'IdUser',IdUser, 'found successfully!');
      result(null, res[0]);
      return;
    }
    result({ message: 'user not found' }, null);
  });
};


Tuser.create = (db, user, result) => {
  db.query('INSERT INTO tuser (IdApplication, IdModule, IdPage, IdUser, NomUser, PrenomUser, Email, Photo, Role ) VALUES (?, ?, ?,?, ?, ?,?, ?, ?)',
    [user.IdApplication, user.IdModule, user.IdPage,user.IdUser, user.NomUser, user.PrenomUser,user.Email, user.Photo, user.Role], (err, res) => {
    if (err) {
      console.log('Error creating user', err);
      result(err, null);
      return;
    }
    console.log('user created successfully!');
        result(null, {
            IdApplication: user.IdApplication,
            IdModule: user.IdModule,
            IdPage: user.IdPage,
            IdUser: res.insertId,
            NomUser: user.NomUser,
            PrenomUser: user.PrenomUser,
            Email: user.Email,
            Photo: user.Photo,
            Role: user.Role,
        });
  });
};

Tuser.update = (db, id, user, result) => {
  db.query(
    'UPDATE tuser SET NomUser = ?, PrenomUser = ?, Email = ?, Photo = ? WHERE IdUser = ?',
    [user.NomUser, user.PrenomUser, user.Email, user.Photo, id],
    (err, res) => {
      if (err) {
        console.log('Error while updating user:', err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ message: 'user not found' }, null);
        return;
      }
      console.log('user updated successfully!', { id, ...user });
      result(null, { id, ...user });
    }
  );
};


Tuser.remove = (db,id, result) => {
  db.query('DELETE FROM tuser WHERE  IdUser = ?', id, (err, res) => {
    if (err) {
      console.log('Error while deleting user with IdUser:', id, err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ message: 'user not found' }, null);
      return;
    }
    console.log('user deleted successfully!');
    result(null, res);
  });
};
module.exports = Tuser;
