const express = require('express');
const morgan = require('morgan');
const core = require('../core');

function server(config) {
  this.config = config;
  this.app = new express();
  this.app.core = core(config);
  this.app.config = config;

  this.app.use(morgan('[:method] :url ---  :date  ---  :response-time ms'));

  this.initRoutes();
}

server.prototype.start = function() {
  this.app.listen(this.config.server.port, () => {
    console.log(`Server is listening on http:\/\/${this.config.server.host}:${this.config.server.port}`);
  })
}

server.prototype.initRoutes = function() {
  require('./routes')(this.app);
}

server.prototype.serveStatics = function(path, dir) {
  this.app.use(path, express.static(dir));
}

module.exports = server;
