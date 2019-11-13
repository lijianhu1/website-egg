'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  passport: {
    enable: true,
    package: 'egg-passport',
  },
  passportLocal: {
    enable: true,
    package: 'passport-local',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 配置 egg-swagger-doc 插件信息。
  swaggerdoc: {
    enable: true, // 是否启用。
    package: 'egg-swagger-doc', // 指定包名称。
  },
};
