const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');

module.exports.createUser = (req, res) => {
    User.find({ name: req.body.name })
        .then(data => {
            if (data.length > 0) {
                res.json({
                    errors: { name: { message: 'Username already taken' } }
                });
            } else {
                const user = new User(req.body);
                bcrypt
                    .hash(user.password, 10)
                    .then(hashed => {
                        user.password = hashed;
                        user.save()
                            .then(data => res.json(data))
                            .catch(err => res.json(err));
                    })
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
};

module.exports.login = (req, res) => {
    User.find({ name: req.body.name })
        .then(data => {
            if (data.length == 1) {
                bcrypt
                    .compare(req.body.password, data[0].password)
                    .then(result => {
                        if (result) {
                            res.json(data);
                        } else {
                            res.json({
                                errors: {
                                    password: { message: 'Incorrect Password' }
                                }
                            });
                        }
                    })
                    .catch(err => res.json(err));
            } else {
                res.json({
                    errors: { name: { message: 'Username Not Found' } }
                });
            }
        })
        .catch(err => res.json(err));
};

module.exports.getAllUsers = (req, res) => {
    User.find()
        .then(data => res.json(data))
        .catch(err => res.json(data));
};

module.exports.getUser = (req, res) => {
    User.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => res.json(err));
};

module.exports.incWallet = (req, res) => {
    User.updateOne(
        { _id: req.params.id },
        { $inc: { wallet: req.body.amount } }
    )
        .then(data => res.json(data))
        .catch(err => res.json(err));
};

module.exports.decWallet = (req, res) => {
    User.updateOne(
        { _id: req.params.id },
        { $inc: { wallet: req.body.amount } }
    )
        .then(data => res.json(data))
        .catch(err => res.json(err));
};

module.exports.editUser = (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        .then(data => res.json(data))
        .catch(err => res.json(err));
};

module.exports.deleteUser = (req, res) => {
    User.deleteOne({ _id: req.params.id })
        .then( () => res.json({message: 'Deleted User'}))
        .catch(err => res.json(err))
};
