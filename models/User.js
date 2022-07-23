const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/] // match a valid email address
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        // referring to the user document model 
        ref: 'User'
    }// array of _id values referencing the User model (self-reference)
    ]
  }, 
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id:false
  }
);
//virtual
// UserSchema.virtual('friendCount').get(function() {
//   return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
// });
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;