const app = require('./http');

const config = {
  server:    require('../configs/api'),
  dynamoDB:  require('../configs/dynamoDB'),
  rtkDB:     require('../configs/rtkDB'),
}

const server = new app(config);

server.start();
