'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  return app.model.define('resume_work', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    resumeId: INTEGER,
    company: STRING(30),
    startDate: STRING(30),
    endDate: STRING(30),
    desc: STRING(500),
    created_at: DATE,
    updated_at: DATE,
  }, {
    freezeTableName: true, // Model 对应的表名将与model名相同
  });
};
