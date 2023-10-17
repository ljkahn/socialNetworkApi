const { User , Thought } = require('../models');

module.exports = {
    //get all users
    async getAll(req, res) {
        try {
            const users = await User.find();
            res.json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //get one user
    async getOne(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId}).select('-__v');

            if(!user) {
                return res.status(404).json({message: 'No user with that ID!'})
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //create a user

    async create(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err)
        }
    },


    //update a user
    async update(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                {username: req.params.userId},
                {$pull: { thoughts: req.params.userId}},
                {runValidators: true, new: true}
                );

                if(!user) {
                    return res.status(404).json({ message: 'No user with that ID!'})
                }
                res.json(user);
        }   catch(err) {
            res.status(500).json(err);
        }
    },


    //delete a user
    async deleteOne (req, res) {
        try {
            const user = await User.findByIdAndDelete({_id:req.params.UserID})

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID!'})
            }
        } catch (err) {
            res.status(500).json(err);
        }
    }



}