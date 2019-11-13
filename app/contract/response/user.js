'use strict';
module.exports = {
  UserInfo: {
    id: { type: 'integer', description: '用户id' },
    username: { type: 'string', description: '用户名' },
    sex: { type: 'string', description: '性别' },
    avatar: { type: 'string', description: '头像图片' },
    resume_base: { type: 'ResumeBase', description: '简历基本信息' },
    resume_skill: { type: 'array', itemType: 'ResumeSkill', description: '技能' },
    resume_work: { type: 'array', itemType: 'ResumeWork', description: '工作经验' },
  },
  ResumeBase: {
    id: { type: 'integer', description: 'id' },
    name: { type: 'string', description: '姓名' },
    company: { type: 'string', description: '公司' },
    position: { type: 'string', description: '职位' },
    jobYear: { type: 'string', description: '工作年限' },
    education: { type: 'string', description: '学历' },
    age: { type: 'string', description: '年龄' },
    telephone: { type: 'string', description: '手机号码' },
    email: { type: 'string', description: '邮箱' },
  },
  ResumeSkill: {
    id: { type: 'integer', description: 'id' },
    skillName: { type: 'string', description: '技能名称' },
    skillDegree: { type: 'string', description: '技能熟练度' },
  },
  ResumeWork: {
    id: { type: 'integer', description: 'id' },
    company: { type: 'string', description: '公司名称' },
    startTime: { type: 'string', description: '入职时间' },
    endTime: { type: 'string', description: '离职时间' },
    desc: { type: 'string', description: '工作描述' },
  },
};
