const router = require('express').Router();
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtControllers');


// /api/thoughts
router.route('/').get(getAll).post(create);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getOne).put(update).delete(deleteOne);

// http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction)

// http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router;