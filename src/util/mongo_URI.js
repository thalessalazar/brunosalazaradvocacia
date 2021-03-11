let MONGO_URI;
require('dotenv').config();

try {
    const config = require('../../config');
    MONGO_URI = config.MONGO_URI;
} catch (err) {
    MONGO_URI = process.env.MONGO_BASE_CONNECTION;

}

module.exports = MONGO_URI;