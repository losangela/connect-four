const controllers = require('./controllers');
const router = require('express').Router();

router
  .route('/room')
    .get(controllers.getRooms)
    .post(controllers.newRoom)
    .put(controllers.editRoom)
    .delete(controllers.deleteRoom)

  module.exports = router;