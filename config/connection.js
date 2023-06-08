const { connect, connection } = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/socialDB");

module.exports = mongoose.connection;