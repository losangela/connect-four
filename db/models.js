const mongoose = require('mongoose');
const db = require('./index');

const playerSchema = mongoose.Schema({
  name: String,
  win: Number,
  lose: Number
})

const roomSchema = mongoose.Schema({
  id: Number,
  board: [mongoose.Schema.Types.Mixed],
  playerRed: mongoose.Schema.Types.Mixed,
  playerYellow: mongoose.Schema.Types.Mixed,
  queue: [mongoose.Schema.Types.Mixed],
  turn: Number,
  winner: mongoose.Schema.Types.Mixed,
  isPlaying: Boolean
})

const Player = mongoose.model('Player', playerSchema);
const Room = mongoose.model('Room', roomSchema);

module.exports = { Player, Room }