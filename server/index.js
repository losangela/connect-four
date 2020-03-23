const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./router')

app
  .use(express.json())
  .use(express.static('./client/dist'))
  .use('/api', router)
  .listen(port, () => console.log('Server connected to port:', port));