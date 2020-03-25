const express = require('express');
const app = express();
const http = require('http').createServer(app);
const port = process.env.PORT || 3000;
// const router = require('./router');
const io = require('./socket').listen(http)
/* for old file config
const io = require('socket.io')(http); 
const socket = require('./socket');
*/ 

app
  .use(express.json())
  .use(express.static('./client/dist'))
  // .use('/api', router);


// io.on('connection', socket) // old file config
  
http.listen(port, () => console.log('Server connected to port:', port));