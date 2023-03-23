const router = require('express').Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
} = require('../../controllers/user-controller');

// /api/user
router.route('/').get(getAllUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// /api/user/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;


// router.route('/').get(getAllUsers).post(createUser);


// router.route('/:userId').get(getSingleUser).delete(deleteUser);


// router.route('/:userId/friend').post(addFriend);

// router.route('/:userId/friend/:friendId').delete(deleteFriend);

// router
//   .route('/:userId/friend/:friendId')
//   .post(addFriend)
//   .delete(deleteFriend);

module.exports = router;
