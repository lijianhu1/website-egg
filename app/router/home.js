'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/userinfo', controller.home.index);
};
