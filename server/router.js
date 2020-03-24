const controllers = require('./controllers');
const router = require('express').Router();

router
  .route('/room')
    .get(controllers.getRoom)
    .post(controllers.newRoom)
    .put(controllers.editRoom)
    .delete(controllers.deleteRoom);

router
  .route('/lobby')
    .get(controllers.getRooms);

router
  .route('/player')
    .get(controllers.getPlayers)
    .post(controllers.newPlayer)
    .put(controllers.editPlayer)
    .delete(controllers.deletePlayer);

module.exports = router;