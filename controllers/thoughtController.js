const { User, Thought } = require('../models');

const thoughtControllers = {
  //get thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },
  // get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.courseId })
      .then((course) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
},
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(async (thought)=> {
        const user = await User.findOneAndUpdate({username:req.body.username},
          {$push: {thoughts: {_id: thought._id}}});
        res.json(thought)
      }
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : User.findOneAndUpdate({ userId: req.body.userId}, {$pull: { thoughts: req.params.thoughtId}}, { new: true})
      )
      .then(() => res.json({ message: 'thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.courseId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(course)
      )
      .catch((err) => res.status(500).json(err));
  },

// Create a reaction
createReaction(req, res) {
  Thought.findOneAndUpdate( 
    { _id: req.params.thoughtId },
    { $addToSet: { reactions: req.body } },
    { runValidators: true, new: true }
  )
    .then((thought) => 
      !thought
        ? res.status(404).json({ message: 'No thought with this id!' })
        : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },  

// Delete a reaction
deleteReaction(req, res) {
  Thought.findOneAndUpdate(
    { _id: req.params.thoughtId },
    { $pull: { reactions: { reactionId: req.params.reactionId }}},
    { runValidators: true, new: true }
  )
    .then((thought) => 
    !thought
      ? res.status(404).json({ message: 'No reaction with this id!' })
      : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
  },
};


module.exports = thoughtControllers;

