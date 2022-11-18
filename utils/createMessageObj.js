module.exports = (username, message) => ({
  message,
  username,
  time: new Date().toISOString(),
});
