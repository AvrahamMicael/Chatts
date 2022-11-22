module.exports = (app, express) => {
  app.use(express.static(require('path').join(__dirname, '../dist')));
};
