const express = require('express');
const router = express.Router();


const tmoduleControllers = require('../controllers/tmoduleController');

module.exports = (db) => {
  router.get('/getall', tmoduleControllers.getAll(db));
  router.post('/create', tmoduleControllers.create(db));
  router.get('/getone/:id', tmoduleControllers.getById(db));
  router.put('/edit/:id', tmoduleControllers.update(db));
  router.delete('/delete/:id', tmoduleControllers.remove(db));
  
  return router;
};