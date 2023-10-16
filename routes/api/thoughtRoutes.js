const router = require('express').Router();
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne
} = require('../../controllers/thoughtController');