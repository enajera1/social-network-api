const { User } = require('../models');

const UserController = {
  // get all users
  getAllUsers(req, res) {
    User.find({})
        // populating thoughts
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        // populating friends 
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .sort({_id: -1})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
},

  //get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate({
      path: 'friends',
      select: '-__v'
  })
    .select('-__v')
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  //createUser
  createUser({ body }, res) {
    User.create(body)
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(400).json(err));
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  
  // Adding friend to friend's list 
  addFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.id },
        { $push: { friends: params.friendId }},
        { new: true, runValidators: true }
    )
    .populate({
        path: 'friends',
        select: ('-__v')
    })
    .select('-__v')
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
        }
        res.json(dbUserData);
        })
        .catch(err => res.json(err));
    
  },
  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  // Deleting friend from friend's list 
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.id }, 
        { $pull: { friends: params.friendId }},
        { new: true }
    )
    .populate({
        path: 'friends', 
        select: '-__v'
    })
    .select('-__v')
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  }
}

module.exports = UserController; 