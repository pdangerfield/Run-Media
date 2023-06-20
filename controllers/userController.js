const User = require('../models/User');

module.exports = {
    // get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // get single user by _id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

        res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // create a user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // update a user by _id
    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    // delete a user
    async deleteUser(req, res) {
        try {
            const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    // add a friend to a user's friend list
    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    },
    // remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { new: true }
            );
            if (!dbUserData) {
                return res.status(404).json({ message: 'No user with this id!' });
            }
            res.json(dbUserData);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
};


