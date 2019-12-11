const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/trivia', { useNewUrlParser: true });

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        minlength: [3, 'Name must contain at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email address']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must contain at least 8 characters']
    },
    wallet: { type: Number, default: 1000, min: [0, 'Cannot give more than the amount in your wallet.'] }
});

module.exports = mongoose.model('User', UserSchema);
