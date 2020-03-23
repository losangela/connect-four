const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/connectfour', { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

//test to see if connection worked
db.on('error', () => console.log('====Error connecting to MongoDB===='));
db.once('open', () => console.log('====Connected to MongoDB!===='));

module.export = db;