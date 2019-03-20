const r = require('rethinkdb');

function locations(config) {
  this.config = config;
  this.table = 'location';
  this.geoIndex = 'position';
}

locations.prototype.getConn = function() {
  return r.connect({ host: this.config.host, port: this.config.port, db: this.config.db });
}

locations.prototype.getNear = async function({ lat, lng, distance, limit, page }) {
  const conn = await this.getConn();

  const data = await r.table(this.table)
                     .getNearest(
                       r.point(lng, lat),
                       { index: this.geoIndex, maxDist: distance }
                     )
                     .pluck({
                       dist: true,
                       doc: {
                         id: true,
                         latitude: true,
                         longitude: true,
                         name: true,
                         media_count: true,
                         profile_pic_url: true
                       }
                     })
                     .skip(page? page*limit: 0).limit(limit)
                     .run(conn)

  await conn.close()

  const docs = data.map(doc => ({ dist: Math.floor(doc.dist), ...doc.doc }))

  return docs;
}

module.exports = locations;
