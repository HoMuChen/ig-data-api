const bodyParser = require('body-parser')

const medias = exports = module.exports = {};

medias.getAll = {
  handler: async (req, res) => {
    const limit = req.query.limit && Number(req.query.limit) || 10;

    if(limit > 100) {
      return res.status(400).send('WTF! Who u are?');
    }

    const data = await req.app.core.dynamoDB.medias.getAll({ limit });

    res.json(data);
  }
}
