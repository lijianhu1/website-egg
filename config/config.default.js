/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
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
  config.keys = appInfo.name + '_1572941540267_978';
  config.passportLocal = {
    username: '',
    password: '',
  };
  // add your middleware config here
  config.middleware = [ 'isLogin', 'notfoundHandler', 'errorHandler' ];
  config.security = {
    xframe: {
      enable: true,
    },
    csrf: {
      headerName: 'csrfToken',
    },
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: '3306',
    database: 'imian',
    username: 'root',
    password: 'root',
    define: { // model的全局配置
      timestamps: true,
      paranoid: false, // 添加软删除
      freezeTableName: true, // 防止修改表名为复数
      underscored: false, // 驼峰式字段被默认转为下划线
    },
    timezone: '+08:00', // 保存为本地时区
    dialectOptions: { // 让读取date类型数据时返回字符串而不是UTC时间
      dateStrings: true,
      typeCast(field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  };
  config.swaggerdoc = {
    dirScanner: './app/controller',
    apiInfo: {
      title: 'egg 接口文档',
      description: 'example for swaggerdoc',
      version: '1.0.0',
    },
    schemes: [ 'http' ],
    enable: true,
    routerMap: true,
    enableSecurity: false,
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
