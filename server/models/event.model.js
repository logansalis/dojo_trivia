const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trivia', { useNewUrlParser: true });

const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide an event name'],
        minlength: [3, 'Event name must be at least 3 characters long.']
    },
    users: { type: [String] },
    jackpot: { type: Number, default: 0 },
    winners: { type: [String] },
    questions: { type: Object }
});

module.exports = mongoose.model('Event', EventSchema);