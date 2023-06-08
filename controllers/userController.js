const { User, Thought }= require('../models');

module.exports = {
    async getAllUsers (req, res) {
        try {
            const userData = await User.find();
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //get one user
    async getOneUser (req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.userId });
            if (!userData) {
                return res.status(404).json({ message: 'No user  with this id was found.' });
            }
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create user
    async createUser (rreq, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //update user
    async updateUser (req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: 'No user with this id was found.' });
            }
            res.json(err);
        } catch {
            res.status(500).json(err);
        }
    },
    //delete user
    async deleteUser (req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.userId });
            if (!userData) {
                return res.status(404).json({ message: 'No user was found with this id' });
            }
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //add friend
    async addFriend (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: 'No user with this id was found.' });
            }
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //remove friend
    async removeFriend (req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            );
            if (!userData) {
                return res.status(404).json({ message: 'No user with this id was found.' });
            }
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        };
    },
}