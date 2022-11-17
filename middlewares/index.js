module.exports = app => {
  app.use(require('cors')());
  app.use(require('./helmet'));
  app.use(require('compression')());
  app.use(require('express-minify')());
};
