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
            const user = await User.findOne({_id: req.params.userId}).select('-__v').populate('thoughts friends')

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
            const user = await User.findByIdAndDelete({_id:req.params.userId})

            if(!user) {
                return res.status(404).json({ message: 'No user with that ID!'})
            }
            res.status(200).json({message: "User deleted!"})
        } catch (err) {
            res.status(500).json(err);
        }
    },

//add friend
async addFriend (req, res) {
    try {
        const friend = await User.findByIdAndUpdate(req.params.userId, {
            $push: {friends: req.params.friendId}})
            return res.status(200).json(friend)
    } catch (err) {
        res.status(500).json(err)
    }
}, 

//remove friend

    async deleteFriend (req, res) {
        try {
            const user = await User.findByIdAndDelete({_id:req.params.userId})

            if(!user) {
                return res.status(404).json({ message: 'No friend with that ID!'})
            }
            res.status(200).json({message: "Friend deleted!"})
        } catch (err) {
            res.status(500).json(err);
        }
    },


}

