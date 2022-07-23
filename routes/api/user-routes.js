const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  addFriend,
  deleteUser,
  deleteFriend
} = require('../../controllers/user-controller');

//set up Get all and Post at /api/users
router
  .route('/')
  .get(getAllUsers)
  .post(createUser);

//set up Get one, put, and delete at /api/users/:id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

// /api/users/:userId/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .put(addFriend)
    .delete(deleteFriend)

module.exports = router; 