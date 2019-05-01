const AWS = require('aws-sdk');

const locations = require('./locations');
const medias = require('./medias');
const users = require('./users');

function dynamoDB(config) {
  this.docClient = new AWS.DynamoDB.DocumentClient({ region: config.region });

  this.locations = new locations(this.docClient);
  this.medias = new medias(this.docClient);
  this.users = new users(this.docClient);
}

module.exports = dynamoDB;
