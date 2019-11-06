'use strict';
const debug = require('debug');
const LocalStrategy = require('passport-local').Strategy;
const { decrypt } = require('./app/public/js/encryption');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async didReady() {
    const config = this.app.config.passportLocal;
    config.passReqToCallback = true;
    this.app.passport.use(new LocalStrategy(config, (req, username, password, done) => {
      // format user貌似正常如果没有passRegToCallback这选项。不写这个函数就直接就能用了
      const user = {
        provider: 'local',
        username,
        password,
      };
      debug('%s %s get user: %j', req.method, req.url, user);
      this.app.passport.doVerify(req, user, done);
    }));
    // // 处理用户信息这个呢，就是做验证用的，比如去数据库里面查用户是否存在，如果存在处理user返回，会进入下一个函数
    this.app.passport.verify(async (ctx, user) => {
      user.password = await decrypt(user.password);
      const auth = await ctx.service.user.login(user);
      ctx.rotateCsrfSecret();
      if (auth.code === 0) {
        return auth.data;
      }
    });
    // 这个接受上一个函数给予的user，保存到session用的，总不能每次用户操作都查数据库吧。由于要进session的，所以这里面保存的字段要精简。
    this.app.passport.serializeUser(async (ctx, user) => {
      return user;
    });
    // 这个函数是从session反查到用户用的。eggjs自动逻辑在前端写入cookie字段。每次访问会带上这个cookie。服务器根据这个cookie判断是谁，然后根据deserializeUser找到用户。
    this.app.passport.deserializeUser(async (ctx, user) => {
      return user;
    });
  }


}

module.exports = AppBootHook;
