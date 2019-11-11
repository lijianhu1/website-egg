'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define('resume_base', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    resumeId: INTEGER,
    name: STRING(30),
    company: STRING(30),
    position: STRING(50),
    jobYear: STRING(20),
    education: STRING(30),
    age: INTEGER,
    telephone: INTEGER,
    email: STRING(50),
    createdAt: DATE,
    updatedAt: DATE,
  }, {
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
  });
};
