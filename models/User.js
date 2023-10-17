const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required: true, 
        unique: true, 
        trim: true 
    },

    email: {
        type: String, 
        unique: true, 
        required: true, 
        match:''//regex
    },
    
    thoughts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'thought',
        }
    ],

    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        }
    ],
    
},

{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = mongoose.model('user', userSchema);

module.exports = User;