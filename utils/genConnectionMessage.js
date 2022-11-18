module.exports = (username, isConnecting = true) => ({
  username,
  message: isConnecting ? 'connected' : 'disconnected',
  time: new Date().toISOString(),
  isConnectionMessage: true,
});
