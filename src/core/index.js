const dynamoDB = require('./dynamoDB');
const rtkDB = require('./rtkDB');

module.exports = (config) => ({
  dynamoDB:    new dynamoDB(config.dynamoDB),
  rtkDB:       new rtkDB(config.rtkDB)
})
