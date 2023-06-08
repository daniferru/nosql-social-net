const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/thoughtController');
const { updateUser } = require('../../controllers/userController');

router
.route('/')
.get(getAllUsers)
.post(createUser)

router
.route('/:id')
.get(getOneUser)
.put(updateUser)
.delete(deleteUser)

router
.route('/:id/friends/friendId')
.post(addFriend)
.delete(removeFriend)

module.exports = router;