const mongoose, { Schema, model } = require('mongoose');
const db = require('./index');

const playerSchema = new Schema({
  name: String,
  win: Number,
  lose: Number
})

const roomSchema = new Schema({
  id: Number,
  board: [Schema.Types.Mixed],
  playerRed: Schema.Types.Mixed,
  playerYellow: Schema.Types.Mixed,
  queue: [Schema.Types.Mixed],
  turn: Number,
  winner: Schema.Types.Mixed,
  isPlaying: Boolean
})

const Player = model('Player', playerSchema);
const Room = model('Room', roomSchema);

module.exports = { Player, Room }