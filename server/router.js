const controllers = require('./controllers');
const router = require('express').Router();

router
  .route('/room')
    .get(controllers.getRooms)
    .post(controllers.newRoom)
    .put(controllers.editRoom)
    .delete(controllers.deleteRoom);

router
  .route('/player')
    .get(controllers.getPlayers)
    .post(controllers.newPlayer)
    .put(controllers.editPlayer)
    .delete(controllers.deletePlayer);

module.exports = router;