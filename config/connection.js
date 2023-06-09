const { connect, connection } = require('mongoose');
connect(process.env.MONGODB_URI || "mongodb://localhost/socialDB");

module.exports = connection;