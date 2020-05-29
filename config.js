require('dotenv').config();

/**
 * @typedef EnvironmentConfiguration
 * @prop {string} OAuth The OAuth Key
 */

 /**
  * @type {EnvironmentConfiguration}
  */

const config = {
    ...process.env,
};

module.exports = config;