const controllers = require('./controllers.js');
const router = require('express').Router();

router
  .route('/game')
  .get(controllers.get)
  .post(controllers.post)
  .put(controllers.put)
//   .delete(controllers.delete)

module.exports = router;