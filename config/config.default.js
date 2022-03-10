/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1646615372614_7832';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.auth = {
    exclude: [ '/api2/user/login', '/api2/user/register', '/' ],
  };

  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'egg_yjserver',
    define: {
      timestamps: false,
      freezeTableName: true,
    },
  };

  config.jwt = {
    secret: 'yj',
  };

  config.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '123456',
      db: 0,
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    redisExpire: 60 * 60 * 24,
  };

  return {
    ...config,
    ...userConfig,
  };
};
