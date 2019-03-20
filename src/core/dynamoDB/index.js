const AWS = require('aws-sdk');

const locations = require('./locations');
const medias = require('./medias');

function dynamoDB(config) {
  this.docClient = new AWS.DynamoDB.DocumentClient({ region: config.region });

  this.locations = new locations(this.docClient);
  this.medias = new medias(this.docClient);
}

module.exports = dynamoDB;
