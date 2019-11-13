'use strict';
module.exports = {
  EditUserInfo: {
    type: { type: 'string', description: '编辑类型 resume_base：基本信息； resume_skill：技能；resume_work：工作经验' },
    data: { type: 'UserInfo' },
    /* data: { type: 'object', properties: {
    } },*/
  },
};
