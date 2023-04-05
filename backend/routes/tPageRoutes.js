const express = require('express');
const router = express.Router();


const tpageControllers = require('../controllers/tpageControllers');

module.exports = (db) => {
  router.get('/getall', tpageControllers.getAll(db));
  router.post('/create', tpageControllers.create(db));
  router.get('/getone/:id', tpageControllers.getById(db));
  router.put('/edit/:id', tpageControllers.update(db));
  router.delete('/delete/:id', tpageControllers.remove(db));
  
  return router;
};