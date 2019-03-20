function medias(docClient) {
  this.table = 'IG.medias';
  this.locationTMIndex = 'location_id-tm-index';
  this.docClient = docClient;
}

medias.prototype.getAll = function({ limit }) {
  const params = {
    TableName: this.table,
    Limit: limit,
  };

  return new Promise((resolve, reject) => {
    this.docClient.scan(params, (err, data) => {
      if(err) reject(err);

      resolve(data);
    })
  })
}

medias.prototype.getByLocation = function({ location_id, from, limit }) {
  const query = from
    ? 'location_id = :value and tm < :from'
    : 'location_id = :value'

  const params = {
    TableName: this.table,
    IndexName: this.locationTMIndex,
    KeyConditionExpression: query,
    ExpressionAttributeValues: {
      ':value': location_id,
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

module.exports = medias;
