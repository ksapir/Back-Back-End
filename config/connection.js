// module.exports = sequelize;
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/trail", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;