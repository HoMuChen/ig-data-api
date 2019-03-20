const bodyParser = require('body-parser')

const locations = exports = module.exports = {};

locations.getOne = {
  handler: async (req, res) => {
    const id = req.params.id;
    const data = await req.app.core.dynamoDB.locations.get({ id });

    res.json(data);
  }
}

locations.getPopular = {
  handler: async (req, res) => {
    const from = req.query.from && Number(req.query.from);
    const limit = req.query.limit && Number(req.query.limit);

    if(limit > 100) {
      return res.status(400).send('WTF! Who u are?');
    }

    const data = await req.app.core.dynamoDB.locations.getPopular({ from, limit });

    res.json(data);
  }
}

locations.getNear = {
  handler: async (req, res) => {
    const lat = req.query.lat && Number(req.query.lat);
    const lng = req.query.lng && Number(req.query.lng);
    const distance = req.query.distance && Number(req.query.distance);
    const limit = req.query.limit && Number(req.query.limit);
    const page = req.query.page && Number(req.query.page);

    if(!lat || !lng || !limit || !distance) {
      return res.status(400).send('Bad request: querystring lat, lon, limit, and distance must be required');
    }

    const data = await req.app.core.rtkDB.locations.getNear({ lat, lng, limit, distance, page });

    res.json(data);
  }
}

locations.getMedias = {
  handler: async (req, res) => {
    const location_id = req.params.id;
    const from = req.query.from && Number(req.query.from);
    const limit = req.query.limit && Number(req.query.limit) || 10;

    const data = await req.app.core.dynamoDB.medias.getByLocation({ location_id, from, limit });

    res.json(data);
  }
}
