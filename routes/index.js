module.exports = (app, express) => {
  app.use(express.static(require('path').join(__dirname, `../${ process.env.NODE_ENV == 'prod' ? 'dist' : 'public' }`)));
};
