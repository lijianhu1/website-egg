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
    created_at: DATE,
    updated_at: DATE,
  }, {
    freezeTableName: true, // Model 对应的表名将与model名相同
  });
};
