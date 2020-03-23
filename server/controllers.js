const { Player, Room } = require('../db/models');

module.exports = {
  getRooms: (req, res) => {
    Room.find((err, doc) => {
      err? 
        res.status(404).send('error grabbing rooms') :
        res.status(200).send(doc)
    })
  },
  newRoom: (req, res) => {
    const roomTemp = {
      id: 1,
      board: [
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0]
      ],
      playerRed: null,
      playerYellow: null,
      queue: [],
      turn: 1,
      winner: null,
      isPlaying: false
    }
    Room.create(roomTemp, (err, doc) => {
      err?
        res.status(404).send('error creating room') :
        res.status(201).send(doc)
    })
  },
  editRoom: (req, res) => {
    const { id, board, playerRed, playerYellow, queue, turn, winner, isPlaying } = req.body;
    Room.findOneAndUpdate(
      { id },
      { board, playerRed, playerYellow, queue, turn, winner, isPlaying },
      (err, doc) => {
        err? 
          res.status(404).send('error editing room'):
          res.status(202).send(`updated for: ${id}`)
      })
  },
  deleteRoom: () => {
    const { id } = req.query;
    Room.findOneAndDelete(
      { id },
      err => {
        err ?
          res.status(404).send('error deleting room') :
          res.status(204).send('deleted room')
      }
    )
  },
  getPlayers: (req, res) => {
    Player.find((err, doc) => {
      err? 
        res.status(404).send('error grabbing players') :
        res.status(200).send(doc)
    })
  },
  newPlayer: (req, res) => {
    const { name, socketId } = req.body;
    Player.create({ name, socketId, win: 0, lose: 0 }, (err, doc) => {
      err?
        res.status(404).send('error adding player') :
        res.status(201).send(doc)
    })
  },
  editPlayer: (req, res) => {
    const { name, win, lose, socketId } = req.body;
    Player.findOneAndUpdate(
      { socketId },
      { name, win, lose },
      (err, doc) => {
        err? 
          res.status(404).send('error editing player'):
          res.status(202).send(`updated for: ${name}`)
      })
  },
  deletePlayer: (req, res) => {
    const { socketId } = req.query;
    Player.findOneAndDelete(
      { socketId },
      err => {
        err ?
          res.status(404).send('error deleting player') :
          res.status(204).send('deleted player')
      }
    )
  }
}