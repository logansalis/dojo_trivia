const event = require('../controllers/event.controller.js');

module.exports = app => {
    app.get('/api/events', event.getAllEvents);
    app.get('/api/events/:id', event.getEvent);
    app.post('/api/events/new', event.createEvent);
    app.put('/api/events/:id/user', event.addUser);
    app.put('/api/events/:id/winner', event.addWinner);
    app.delete('/api/events/:id', event.delete);
};
