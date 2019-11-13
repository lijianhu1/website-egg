'use strict';
const { Controller } = require('egg');
const fs = require('fs');
// node.js 路径操作对象
const path = require('path');
/**
 * @Controller user
 */
class UserController extends Controller {
  async authCallback() {
    const { ctx } = this;
    const type = ctx.query.type;
    if (ctx.isAuthenticated() && type === '1') {
      ctx.body = {
        code: 0,
        message: '登录成功！',
      };
    } else {
      ctx.body = {
        code: 1,
        message: '登录失败！',
      };
    }
  }
  /**
   * @summary 获取公钥
   * @description 获取公钥
   * @router get /getPublicKey
   * @response 200 Response successed
   */
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


  /**
   * @summary 获取用户信息
   * @description 获取当前用户信息
   * @router get /getUserInfo
   * @response 200 UserInfo successed
   */
  async getUserInfo() {
    const { ctx } = this;
    ctx.body = await ctx.service.user.getUserInfo();
  }

  /**
   * @summary 编辑用户信息
   * @router post /editUserInfo
   * @request body EditUserInfo *body
   * @response 200 Response successed
   */
  async editUserInfo() {
    const { ctx } = this;
    const config = ctx.request.body;
    ctx.body = await ctx.service.user.editUserInfo(config);
  }

  /**
   * @summary 删除技能、工作经验
   * @router get /deleteUserInfo
   * @request query string *id 删除id
   * @response 200 Response successed
   */
  async deleteUserInfo() {
    const { ctx } = this;
    const config = ctx.request.query;
    ctx.body = await ctx.service.user.deleteUserInfo(config);
  }

  /**
   * @summary 上传头像
   * @router post /updateAvatar
   * @request formData file *file 上传文件
   * @response 200 Response successed
   */
  async updateAvatar() {
    const { ctx } = this;
    const config = ctx.request.query;
    ctx.body = await ctx.service.user.updateAvatar(config);
  }
}

module.exports = UserController;
