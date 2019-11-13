'use strict';
module.exports = () => {
  return async function(ctx, next) {
    // 排除掉不用登陆就能看的功能页面。
    const noNeedLoginPath = [ '/login', '/authCallback', '/getPublicKey', '/user/register', '/getUserInfo' ];
    const reg = new RegExp(/^\/swagger/); // swagger接口文档过滤
    if ((noNeedLoginPath.indexOf(ctx.path) === -1 && !ctx.isAuthenticated()) && !reg.test(ctx.path)) {
      ctx.session.returnTo = ctx.path;
      ctx.body = {
        code: 302,
        message: '请先登录！',
      };
      return;
    }
    // 别搞乱了先后顺序，如果没有登陆，上面就return了。不再执行下面的代码。
    await next();
  };
};
