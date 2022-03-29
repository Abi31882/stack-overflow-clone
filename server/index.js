const app = require('./app');
const mongoose = require('mongoose');
const config = require('./config');

const connect = (url) => {
  return mongoose.connect(url, config.db.options);
};

if (require.main === module) {
  app.listen(config.port, () => {
    console.log(`app running on port ${config.port}`);
  });
  connect(config.db.prod).then(() => {
    console.log('database connected');
  });
  mongoose.connection.on('error', console.log);
}

module.exports = { connect };
