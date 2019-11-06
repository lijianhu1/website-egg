'use strict';
module.exports = app => {
  const { router, controller } = app;
  // 鉴权成功后的回调页面
  router.get('/authCallback', controller.user.authCallback);
  router.post('/login', app.passport.authenticate('local', {
    successRedirect: '/api/authCallback?type=1',
    failureRedirect: '/api/authCallback?type=2',
  }));
  router.get('/getPublicKey', controller.user.getPublicKey);
  router.get('/getUserInfo', controller.user.getUserInfo);
  router.post('/editUserInfo', controller.user.editUserInfo);
  router.get('/deleteUserInfo', controller.user.deleteUserInfo);
  // router.get('/logout', controller.user.logout);
  // router.post('/login', controller.user.login);
};
