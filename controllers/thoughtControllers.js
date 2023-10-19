const { Thought } = require('../models');

module.exports = {
    //get all thoughts
    async getAll(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts)
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    //get one thought
    async getOne(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).populate('reactions');

            if(!thought) {
                return res.status(404).json({message: 'No thought with that ID!'})
            }
            res.status(200).json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    //create a thought

    async create(req, res) {
        try {
            //deconstruct the json object sent in the req.body
            const {thoughtText, username} = req.body;

            //create new thought
            const newThought = new Thought({
                thoughtText,
                username,
            });

            //save the thought to the database
            const savedThought = await newThought.save();

            //push created thought's id to the user's array 
            const user = await User.findOneAndUpdate(
                {username },
                { $push: { thoughts: savedThought._id} },
                { new: true}
            );

            if(!user) {
                return res.status(400).json({ message: 'No user with that ID!'})
            }
            res.status(200).json(savedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
    },

    //add a reaction
    async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true },
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }

      res.status(200).json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },


    //update a thought
    async update(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$set: req.body},
                {runValidators: true, new: true}
                );

                if(!thought) {
                    return res.status(404).json({ message: 'No thought with that ID!'})
                }
                res.status(200).json(thought);
        }   catch(err) {
            console.error(err)
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

            await User.findOneAndUpdate(
                { username: thought.username },
                {$pull: { thoughts: req.params.thoughtId}},
                { runValidators: true, new: true}
            )
        } catch (err) {
            res.status(500).json(err);
        }
    }



}
