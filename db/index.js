const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/connectfour', { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

//test to see if connection worked
db.on('error', () => console.log('There was an error connecting to the db'));
db.once('open', () => console.log('Connection to MongoDB successful!'));

module.export = db;