const locations = require('../controllers/locations');

module.exports = (app) => {
  app.get('/api/locations',           locations.getPopular.handler);
  app.get('/api/locations/near',      locations.getNear.handler);
  app.get('/api/locations/:id',       locations.getOne.handler);
  app.get('/api/locations/:id/medias',locations.getMedias.handler);
}
