const geohash = require('ngeohash');
const GeoPoint = require('geopoint');
const PRECISION = 7;

function locations(docClient) {
  this.table = 'IG.locations';
  this.hotIndex = 'is_public-media_count-index';
  this.geoIndex = 'geo_hash-media_count-index';
  this.docClient = docClient;
}

locations.prototype.get = function({ id }) {
  if(!id) {
    return Promise.reject(new Error('id is required!'))
  }

  const params = {
    TableName: this.table,
    Key: {
      id
    }
  };

  return new Promise((resolve, reject) => {
    this.docClient.get(params, (err, data) => {
      if(err) reject(err);

      resolve(data);
    })
  })
}

locations.prototype.getPopular = function({ from=5000000, limit=10 }) {
  const params = {
    TableName: this.table,
    IndexName: this.hotIndex,
    KeyConditionExpression: 'is_public = :value and media_count < :from',
    ExpressionAttributeValues: {
      ':value': 1,
      ':from': from,
    },
    ScanIndexForward: false,
    Limit: limit
  }

  return new Promise((resolve, reject) => {
    this.docClient.query(params, (err, data) => {
      if(err) reject(err);

      resolve(data);
    })
  })
}

locations.prototype.getNear = function({ lat, lon, n=1 }) {
  const center = new GeoPoint(lat, lon);
  const hash = geohash.encode(lat, lon, PRECISION);

  const params = {
    TableName: this.table,
    IndexName: this.geoIndex,
    KeyConditionExpression: 'geo_hash = :geohash',
    ExpressionAttributeValues: {
      ':geohash': hash,
    },
    ScanIndexForward: false,
  }

  return new Promise((resolve, reject) => {
    this.docClient.query(params, (err, data) => {
      if(err) reject(err);

      const docs = data.Items.map(doc => {
        const point = new GeoPoint(doc.latitude, doc.longitude);
        const distance = Math.ceil(center.distanceTo(point, true) * 1000);

        const { is_public, ...expose } = doc;

        return { distance, ...expose };
      })

      resolve(docs);
    })
  })
}

module.exports = locations;
