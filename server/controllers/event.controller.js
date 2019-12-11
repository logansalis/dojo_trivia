const Event = require('../models/event.model.js');

module.exports.createEvent = (req, res) => {
    const event = new Event(req.body);
    event
        .save()
        .then(data => res.json(data))
        .catch(err => res.json(err));
};

module.exports.addUser = (req, res) => {
    Event.updateOne(
        { _id: req.params.id },
        { $inc: { jackpot: req.body.amount }, $push: { users: req.params.id } }
    )
        .then(data => res.json(data))
        .catch(err => res.json(err));
};

module.exports.addWinner = (req, res) => {
    Event.updateOne(
        { _id: req.params.id },
        { $push: { winners: req.params.id } }
    )
        .then(data => res.json(data))
        .catch(err => res.json(err))
};

module.exports.getAllEvents = (req, res) => {
    Event.find()
        .then(data => res.json(data))
        .catch(err => res.json(err));
};

module.exports.getEvent = (req, res) => {
    Event.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.json(err));
};

module.exports.delete = (req, res) => {
    Event.deleteOne({ _id: req.params.id })
        .then(data => res.json({ message: 'Deleted Event' }))
        .catch(err => res.json(err));
};
