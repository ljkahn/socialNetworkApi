const mongoose = require('mongoose');
const dayJS = require('dayjs');
const reactionSchema = require('./Reaction')
function formatTime (timestamp) {
const day = dayJS(timestamp)
return day.format('DD/MM/YYYY')
}

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String, 
        required: true, 
        minLength: 1,
        maxLength: 280,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: formatTime
    },
    
    username: {
        type: String,
        required: true, 
        
    },

    reactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'reaction',
    }]
        
},

{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;