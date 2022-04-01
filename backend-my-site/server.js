const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
var corsOptions = {
    origin: 'http://localhost:3000',
    // origin: 'https://new-chat-app-udmy.herokuapp.com',
    credentials: true,
    optionsSuccessStatus: 200 // For legacy browser support
}
const authRoutes = require('./routes/authRoutes');
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

const http = require('http').createServer(app);
const mongoose = require('mongoose');
const socketio = require('socket.io')
const io = socketio(http);

const mongoDB = "mongodb+srv://onkar:onkar@cluster0.qey1d.mongodb.net/blog-site-curd?retryWrites=true&w=majority";


mongoose.connect(mongoDB, { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => console.log('mongodb connected')).catch(err => console.log(err))


const { addUser, getUser, removeUser } = require('./helper');
const PORT = process.env.PORT || 5000;

app.get('/set-cookies', (req, res) => {
    res.cookie('username', 'Tony');
    res.cookie('isAuthenticated', true, { maxAge: 24 * 60 * 60 * 1000 });
    res.send('cookies are set');
})
app.get('/get-cookies', (req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.json(cookies);
})


io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('join', ({ name, room_id, user_id }) => {
        const { error, user } = addUser({
            socket_id: socket.id,
            name,
            room_id,
            user_id
        })
        socket.join(room_id);
        if (error) {
            console.log('join error', error)
        } else {
            console.log('join user', user)
        }
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    })
});

http.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});