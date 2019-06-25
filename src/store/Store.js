let Store;
if (process.env.NODE_ENV === 'production') {
  Store = require('./Store.prod');
} else {
  Store = require('./Store.dev');
}

module.exports = Store.default();
