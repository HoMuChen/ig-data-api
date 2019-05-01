const bodyParser = require('body-parser')

const users = exports = module.exports = {};

users.getOne = {
  handler: async (req, res) => {
    const id = req.params.id;
    const data = await req.app.core.dynamoDB.users.get({ id });

    res.json(data);
  }
}

users.getPopular = {
  handler: async (req, res) => {
    const from = req.query.from && Number(req.query.from);
    const limit = req.query.limit && Number(req.query.limit);

    if(limit > 100) {
      return res.status(400).send('WTF! Who u are?');
    }

    const data = await req.app.core.dynamoDB.users.getPopular({ from, limit });

    res.json(data);
  }
}

users.getMedias = {
  handler: async (req, res) => {
    const user_id = req.params.id;
    const from = req.query.from && Number(req.query.from);
    const limit = req.query.limit && Number(req.query.limit) || 10;

    const data = await req.app.core.dynamoDB.medias.getByUser({ user_id, from, limit });

    res.json(data);
  }
}
