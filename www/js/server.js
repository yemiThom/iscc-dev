var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.send('Loaded');
});

io.on('connection', function (socket) {
    console.log('A user connected!');
});

http.listen(8800, function () {
    console.log('listening on *:8800');
});

/*var express = require('express');
var socket = require('socket.io');

//app setup
var app = express();
var server = app.listen(4000, function(){
    console.log('listening to requests on port 3000');
});

//static files
app.use(express.static('www'));

//socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('made socket connection');
});*/