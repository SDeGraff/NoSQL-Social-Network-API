const { Schema, model } = require('mongoose');
const assignmentSchema = require('./thought');

// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/,'Enter a valid Email' ]
    },
   thoughts: [{
      type: Schema.Types.ObjectId,
      ref: 'thought'
   },
   ],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
  ],
},
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

userSchema.virtual('friendcount').get(function () {
  return this.friends.length;
})

userSchema.pre('remove', function() {
  thought.deletemany({_id: req.params.thoughtId})
  .then(() => user.updateMany({}, {$pull: {friends: req.params.userId}}))
  .then(() => user.updateMany({}, {$pull: {thoughts: req.params.thoughtId}}))
  .then(() => res.json({ message: 'user deleted!' }))
  .catch(err => res.json(err));
  });


const User = model('User', userSchema);

module.exports = User;
