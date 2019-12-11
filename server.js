const express = require('express');
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public/dist/public'));
require('./server/routes/user.routes.js')(app);
require('./server/routes/event.routes.js')(app);
app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./public/dist/public/index.html'));
});
// app.listen(8000, () => console.log('Listening on port 8000.'));
const server = app.listen(8000, () => console.log('Listening on port 8000.'));
const io = require('socket.io')(server);

let messages = [{name: 'Admin', message: 'Welcome to the game chat! Thank you for your donations <3'}];

io.on('connection', function(socket) {
    socket.emit('greeting', {
        msg: 'Greetings, from server Node, brought to you by Sockets! -Server',
        messages: messages,
    });
    socket.on('thankyou', function(data) {
        console.log('Connected: ' + data.name);
        socket.emit('user', data);
    });

    socket.on('newEvent', data => {
        let countdown = 30;
        const alertInterval = setInterval(() => {
            console.log(countdown);
            countdown--;
            socket.broadcast.emit('alertEvent', {
                event: true,
                countdown: countdown,
                loser: true
            });
            if (countdown === -1) {
                socket.broadcast.emit('alertEvent', {
                    event: false,
                    countdown: 0,
                    loser: false
                });
                let questionNum = 0;
                countdown = 11;
                const gameInterval = setInterval(() => {
                    console.log(countdown);
                    countdown--;
                    socket.broadcast.emit('gameCount', {
                        countdown: countdown
                    });
                    if (countdown >= 10) {
                        socket.broadcast.emit('questionNumber', {
                            number: questionNum
                        });
                    } else if (countdown == 9) {
                        const pos = Math.floor(Math.random() * 4);
                        const ans = [];
                        for (let i = 0; i < pos; i++) {
                            ans.push(data[questionNum].incorrect_answers[i]);
                        }
                        ans.push(data[questionNum].correct_answer);
                        for (let i = pos; i < 3; i++) {
                            ans.push(data[questionNum].incorrect_answers[i]);
                        }
                        socket.broadcast.emit('newQuestion', {
                            question: data[questionNum].question,
                            answers: ans,
                            correct: data[questionNum].correct_answer
                        });
                    } else if (countdown >= -3 ) {
                        socket.broadcast.emit('gameCount', {
                            countdown: countdown
                        });
                    } else if (questionNum == 4) {
                        clearInterval(gameInterval);
                        messages = [{name: 'Admin', message: 'Welcome to the pre-game chat! Thank you for your donations <3'}];
                        socket.broadcast.emit('gameFinished', messages);
                    } else {
                        countdown = 11;
                        questionNum++;
                    }
                }, 1000);
                clearInterval(alertInterval);
            }
        }, 1000);
    });
    
    socket.on('newMessage', function(data) {
        messages.push(data)
        io.emit('onNewMessage', messages);
    });
});
