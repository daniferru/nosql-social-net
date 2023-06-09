const { Thought, User } = require('../models/index');

const thoughtController = {
    //get all thoughts
    async getAllThoughts( req, res) {
        try {
            const thoughtData = await Thought.find()
            res.json(thoughtData);
        } catch (errr) {
            res.status(500).json(err);
        }
    },
    //get one thought
    async getOneThought (req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId });
            res.json(thoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //create thought
    async createThought (req, res) {
        try {
            const thoughtData = await Thought.create(req.body);
            const userData = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: thoughtData._id }},
                {  new: true }
            );
            if (!user) {
                return res.statuss(400).json({ message: 'No user with this id was found.' });
            }
            res.json({ message: 'Thought Created' })
        } catch (err) {
            console.log(err);
        }
    },
    //update thought
    async updateThought (req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought with this id was found.' });
            };
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //remove thought
    async removeThought (req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this id ws found.' });
            }
            await User.findOneAndDelete(
                { thought: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId }},
                { new: true }
            );
                res.json({ message: 'Thought successfully deleted!' });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //add reaction
    async addReaction (req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: {reactions: req.body }},
                { new: true }
            );
            if (!reaction) {
                return res.json.status(400).json({ message: 'No reaction or thought was found with this id.' });
            }
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //remove reaction
    async removeReaction (req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId }}},
                { new: true }
            )
            if (!reaction) {
                res.status(404).json({ message: 'No reaction found with this id.' });
            }
            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};