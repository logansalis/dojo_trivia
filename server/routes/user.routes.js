const user = require('../controllers/user.controller.js');

module.exports = (app) => {
    app.get('/api/users', user.getAllUsers);
    app.get('/api/users/:id', user.getUser);
    app.post('/api/users/new', user.createUser);
    app.post('/api/users/login', user.login);
    app.put('/api/users/:id', user.editUser);
    app.put('/api/users/:id/increase', user.incWallet);
    app.put('/api/users/:id/decrease', user.decWallet);
    app.delete('/api/users/:id', user.deleteUser)
}