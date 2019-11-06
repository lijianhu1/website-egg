'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: STRING(30),
    password: STRING(255),
    sex: INTEGER,
    avatar: STRING(255),
    updated_at: DATE,
    created_at: DATE,
  }, {
    freezeTableName: true, // Model 对应的表名将与model名相同
  });
  User.associate = () => {
    // 与ResumeBase存在一对一关系，所以是hasOne()
    app.model.User.hasOne(app.model.ResumeBase, { foreignKey: 'resumeId' });
    app.model.User.hasMany(app.model.ResumeSkill, { foreignKey: 'resumeId', as: 'resume_skill' });
    app.model.User.hasMany(app.model.ResumeWork, { foreignKey: 'resumeId', as: 'resume_work' });
  };
  return User;
};
