const router = require('express').Router();

const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

router
.route('/')
.get(getAllThoughts)
.post(createThought)

router
.route('/:thoughtId')
.get(getOneThought)
.put(updateThought)
.delete(removeThought);

router
.route('/:thoughtId/reactions')
.post(addReaction)
.delete(removeReaction)


module.exports = router;