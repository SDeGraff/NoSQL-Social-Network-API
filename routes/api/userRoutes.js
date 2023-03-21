const router = require('express').Router();
const {
  getUser,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/usertController');

// /api/user
router.route('/').get(getUser).post(createUser);


router.route('/:userId').get(getSingleUser).delete(deleteUser);


router.route('/:userId/friend').post(addFriend);

router.route('/:userId/friend/:friendId').delete(deleteFriend);

router
  .route('/:userId/friend/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

module.exports = router;
