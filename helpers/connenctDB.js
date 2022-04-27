const mongoose = require('mongoose');

function connect() {
  mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {
      keepAlive: true,
      keepAliveInitialDelay: 300000,
    },
    null
  );
}

module.exports = {
  connect,
  mongoose,
};
