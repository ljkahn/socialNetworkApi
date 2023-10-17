const router = require('express').Router();
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne
} = require('../../controllers/thoughtControllers');


// /api/thoughts
router.route('/').get(getAll).post(create);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getOne).put(update).delete(deleteOne);

module.exports = router;