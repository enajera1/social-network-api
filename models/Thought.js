const { Schema, model, Types } = require('mongoose')
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdVal => dateFormat(createdVal)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      //must be between 1-280 characters
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdVal) => dateFormat(createdVal)
    }, 
    username: {
      type: String,
      required: true
    }, 
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
}); //check if works

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;