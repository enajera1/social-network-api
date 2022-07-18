const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      // unique. check assignments
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      //unique
      // validate. (look into mongoose's matching validation)
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      // array of _id values referencing the User model (self-reference)
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
UserSchema.virtual('friendCount').get(function() {
  return this.friends.reduce((total, friends) => total + friends.length + 1, 0);
});

const User = model('User', UserSchema);

module.exports = User;