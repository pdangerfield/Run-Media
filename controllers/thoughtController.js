const Thought = require('../models/Thought');

module.exports = {
    //get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(400).json(err);
        }
    },
    //get single thought by _id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id:req.params.thoughtId});

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!'});
            }
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
        },
        // create a thought
        async createThought(req, res) {
            try {
                const dbThoughtData = await Thought.create(req.body);
                res.json(dbThoughtData);
            } catch (err) {
                res.status(400).json(err);
            }
            },
            // update a thought by _id
            async updateThought(req, res) {
                try {
                    const dbThoughtData = await Thought.findOneAndUpdate(
                        {_id: req.params.thoughtId },
                        {$set: req.body },
                        {new: true }
                    );
                    if (!dbThoughtData) {
                        return res.status(404).json ({ message: "No thought with this id!"});

                    }
                    res.json(dbThoughtData);
                } catch (err) {
                    res.status(400).json(err);
                }
                    },
                    // delete a thought
                    async deleteThought(req, res) {
                        try {
                            const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
                            if (!dbThoughtData) {
                                return res.status(404).json({ message: 'No thought with this id!' });
                            }
                            res.json(dbThoughtData);
                        } catch (err) {
                            res.status(400).json(err);
                        }
                    },
                    // add a reaction
                    async addReaction(req, res) {
                        try {
                            const dbThoughtData = await Thought.findOneAndUpdate(
                                {_id: req.params.thoughtId },
                                { $push: { reactions: req.body } },
                                { new: true }
                            );
                            if (!dbThoughtData) {
                                return res.status(404).json({ message: 'No thought with this id!' });
                            }
                            res.json(dbThoughtData);
                        }
                        catch (err) {
                            res.status(400).json(err);
                        }
                    },
                    // remove a reaction
                    async removeReaction(req, res) {
                        try {
                            const dbThoughtData = await Thought.findOneAndUpdate(
                                { _id: req.params.thoughtId },
                                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                                { new: true }
                            );
                            if (!dbThoughtData) {
                                return res.status(404).json({ message: 'No thought with this id!' });
                            }
                            res.json(dbThoughtData);
                        } catch (err) {
                            res.status(400).json(err);
                }
            }
        };