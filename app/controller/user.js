'use strict';
const { Controller } = require('egg');
const fs = require('fs');
// node.js 路径操作对象
const path = require('path');

class UserController extends Controller {
  async authCallback() {
    const { ctx } = this;
    const type = ctx.query.type;
    if (ctx.isAuthenticated() && type === '1') {
      ctx.body = {
        code: 200,
        message: '登录成功！',
      };
    } else {
      ctx.body = {
        code: 0,
        message: '登录失败！',
      };
    }
  }

  async getPublicKey() {
    const { ctx, config } = this;
    const publicPem = fs.readFileSync(path.join(config.baseDir, 'app/public/pem/public.pem'), 'utf-8');
    ctx.status = 200;
    ctx.body = {
      code: ctx.status,
      message: '操作成功',
      data: publicPem,
    };
  }

  async getUserInfo() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUserInfo();
  }
  async editUserInfo() {
    const { ctx } = this;
    const config = ctx.request.body;
    ctx.body = await ctx.service.user.editUserInfo(config);
  }
  async deleteUserInfo() {
    const { ctx } = this;
    const config = ctx.request.query;
    ctx.body = await ctx.service.user.deleteUserInfo(config);
  }
}

module.exports = UserController;
