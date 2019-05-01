const users = require('../controllers/users');

module.exports = (app) => {
  app.get('/api/users',                  users.getPopular.handler);
  app.get('/api/users/:id',              users.getOne.handler);
  app.get('/api/users/:id/medias',       users.getMedias.handler);
}
