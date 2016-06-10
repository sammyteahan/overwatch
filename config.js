/**
* @name config
* @desc configuration object to pass around redis and other global settings
*/
if (process.env.NODE_ENV === 'staging') {
  module.exports = {
    port: 8080
  };
} else if (process.env.NODE_ENV === 'production') {
  module.exports = {
    port: 8080
  };
} else {
  module.exports = {
    port: 3000
  };
}
