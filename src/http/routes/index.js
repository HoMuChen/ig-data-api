module.exports = (app) => {
  require('./locations')(app);
  require('./medias')(app);
  require('./users')(app);
}
