module.exports = require('helmet')({
  contentSecurityPolicy: {
    directives: {
      'script-src': [
        "'self'",
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js',
      ],
    },
  },
});
