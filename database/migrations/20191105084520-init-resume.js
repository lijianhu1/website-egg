'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    await queryInterface.createTable('resume_base', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      resumeId: INTEGER,
      name: STRING(30),
      company: STRING(30),
      position: STRING(50),
      jobYear: STRING(20),
      education: STRING(30),
      age: INTEGER,
      telephone: STRING(15),
      email: STRING(50),
      created_at: DATE,
      updated_at: DATE,
    }, {
      timestamps: false,
    });
    await queryInterface.createTable('resume_skill', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      resumeId: INTEGER,
      skillName: STRING(30),
      skillDegree: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    }, {
      timestamps: false,
    });
    await queryInterface.createTable('resume_work', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      resumeId: INTEGER,
      company: STRING(30),
      startDate: STRING(30),
      endDate: STRING(30),
      desc: STRING(500),
      created_at: DATE,
      updated_at: DATE,
    }, {
      timestamps: false,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
