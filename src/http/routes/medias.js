const medias = require('../controllers/medias');

module.exports = (app) => {
  app.get('/api/medias',           medias.getAll.handler);
}
