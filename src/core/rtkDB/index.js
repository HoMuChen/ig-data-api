const r = require('rethinkdb');

const locations = require('./locations');

function rtkDB(config) {
  this.locations = new locations(config);
}

module.exports = rtkDB;
