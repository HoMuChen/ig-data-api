function users(docClient) {
  this.table = 'IG.users';
  this.fansCountIndex = 'is_private-fans_count-index';
  this.docClient = docClient;
}

users.prototype.get = function({ id }) {
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

users.prototype.getAll = function({ limit }) {
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

users.prototype.getPopular = function({ from=10000000, limit=10 }) {
  const params = {
    TableName: this.table,
    IndexName: this.fansCountIndex,
    KeyConditionExpression: 'is_private = :value and fans_count < :from',
    ExpressionAttributeValues: {
      ':value': 0,
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

module.exports = users;
