const { Thought } = require('../models');

module.exports = {
    //get all thoughts
    async getAll(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get one thought
    async getOne(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v');

            if(!thought) {
                return res.status(404).json({message: 'No thought with that ID!'})
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create a thought

    async create(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },


    //update a thought
    async update(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {username: req.params.thoughtId},
                {$pull: { thoughts: req.params.thoughtId}},
                {runValidators: true, new: true}
                );

                if(!thought) {
                    return res.status(404).json({ message: 'No thought with that ID!'})
                }
                res.json(thought);
        }   catch(err) {
            res.status(500).json(err);
        }
    },


    //delete a thought
    async deleteOne (req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({_id:req.params.thoughtID})

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID!'})
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }



}