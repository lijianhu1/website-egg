'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// 配置路由元件
module.exports = app => {
  require('./router/home.js')(app);
  require('./router/user.js')(app);
};
