'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/userinfo', controller.home.index);
  router.post('/fileUpload', controller.home.fileUpload);
};
