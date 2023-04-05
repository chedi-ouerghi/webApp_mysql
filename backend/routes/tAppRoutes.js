const express = require('express');
const tapplicationControllers = require('../controllers/tapplicationControllers');

const tAppRoutes = (db) => {
  const router = express.Router();

  router.get('/getall', tapplicationControllers.getAll(db));
  router.get('/getOne/:id', tapplicationControllers.getById(db));
  router.post('/add', tapplicationControllers.create(db));
router.put('/edit/:id', tapplicationControllers.update(db));
router.delete('/delete/:id', tapplicationControllers.remove(db));
// router.delete('/delete-selected', tapplicationControllers.removeSelected(db));


  return router;
};
module.exports = tAppRoutes;

