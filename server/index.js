const express = require('express');
const app = express();
const http = require('http').createServer(app);
// const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
// const router = require('./router');
// const socket = require('./socket');
const io = require('./socket').listen(http)


app
  .use(express.json())
  .use(express.static('./client/dist'))
  // .use('/api', router);

// io.on('connection', socket)
  
http.listen(port, () => console.log('Server connected to port:', port));