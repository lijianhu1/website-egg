'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define('resume_skill', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    resumeId: INTEGER,
    skillName: STRING(30),
    skillDegree: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    freezeTableName: true, // Model 对应的表名将与model名相同
  });
};
