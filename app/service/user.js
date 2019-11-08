'use strict';
const Service = require('egg').Service;
const Code = require('../util/util').Code;

class UserService extends Service {
  async getUserInfo() {
    const { ctx } = this;
    const result = await ctx.model.User.findOne({
      attributes: [ 'id', 'username', 'sex', 'avatar' ],
      where: {
        id: ctx.session.passport.user.id,
      },
      include: [{
        model: ctx.model.ResumeBase,
        attributes: { exclude: [ 'resumeId', 'created_at', 'updated_at' ] },
      }, {
        model: ctx.model.ResumeSkill,
        attributes: { exclude: [ 'created_at', 'updated_at' ] },
        as: 'resume_skill',
      }, {
        model: ctx.model.ResumeWork,
        attributes: { exclude: [ 'created_at', 'updated_at' ] },
        as: 'resume_work',
      }],
    });
    return Object.assign({}, Code.SUCCESS, {
      data: result,
    });
  }

  async login(info) {
    const { ctx } = this;
    const result = await ctx.model.User.findOne({
      attributes: [ 'id', 'username', 'age', 'sex', 'avatar' ],
      where: {
        username: info.username,
        password: info.password,
      },
      include: [{
        model: ctx.model.ResumeBase,
        attributes: { exclude: [ 'resumeId', 'created_at', 'updated_at' ] },
      }, {
        model: ctx.model.ResumeSkill,
        attributes: { exclude: [ 'created_at', 'updated_at' ] },
        as: 'resume_skill',
      }, {
        model: ctx.model.ResumeWork,
        attributes: { exclude: [ 'created_at', 'updated_at' ] },
        as: 'resume_work',
      }],
    });
    if (result) {
      // const resumeId = result.id;
      return Object.assign({}, Code.SUCCESS, {
        data: result,
      });
    }
    return Object.assign({}, Code.ERROR, {
      data: result,
    });

  }

  async editUserInfo(info) {
    const { ctx } = this;
    let result = '';
    if (!info.type) {
      return Code.ERROR;
    } else if (info.type === 'resume_base') {
      const user = await ctx.model.ResumeBase.findOne({
        where: {
          resumeId: ctx.session.passport.user.id,
        },
      });
      if (user) {
        result = await user.update(info.data);
      } else {
        info.data.resumeId = ctx.session.passport.user.id;
        return await ctx.model.ResumeBase.create(info.data);
      }
    } else if (info.type === 'resume_skill') {
      for (const item of info.data) {
        if (!item.resumeId) {
          item.resumeId = ctx.session.passport.user.id;
        }
      }
      await ctx.model.ResumeSkill.findAll({
        where: {
          resumeId: ctx.session.passport.user.id,
        },
      });
      result = await ctx.model.ResumeSkill.bulkCreate(info.data, { updateOnDuplicate: [ 'id', 'skillName', 'skillDegree' ] });
    }
    return Object.assign({}, Code.SUCCESS, {
      data: result,
    });
  }
  async deleteUserInfo(info) {
    const { ctx } = this;
    if (!info.type) {
      return Code.ERROR;
    }
    let type = '';
    switch (info.type) {
      case 'resume_skill':
        type = 'ResumeSkill';
        break;
      default:
        break;
    }
    await ctx.model[type].destroy({
      where: {
        id: info.id,
      },
    });
    return Object.assign({}, Code.SUCCESS);
  }
}

module.exports = UserService;
