const express = require('express');
const router = express.Router();


const tuserControllers = require('../controllers/usersController');

module.exports = (db) => {
  router.get('/getall', tuserControllers.getAll(db));
  router.post('/create', tuserControllers.create(db));
  router.get('/getone/:id', tuserControllers.getById(db));
  router.put('/edit/:id', tuserControllers.update(db));
  router.delete('/delete/:id', tuserControllers.remove(db));
  
  return router;
};