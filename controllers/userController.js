
const { User, Thought } = require('../models');

module.exports = {
  // Get all user
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user
  getSingleStudent(req, res) {
    User.findOne({ _id: req.params.studentId })
      .select('-__v')
      .populate('friends')
        .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) =>  res.status(500).json(err));
  },

  // Create a new user
  createUser(req, res) {
    user.create(req.body)
      .then((user) => res.json(course))
      .catch((err) => res.status(500).json(err));
      },

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.studentId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json({ message: 'user deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add a friend to the user's list
  addFriend(req, res) { 
    User.findOneAndUpdate(
      { _id: req.params.studentId },
      { $addToSet: { friends: req.params.friendId } },
      {runValidators: true, new: true}
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Remove a friend from the user's list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.studentId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};