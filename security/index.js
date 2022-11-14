module.exports = app => {
  app.use(require('cors')());
  app.use(require('helmet')());
};
