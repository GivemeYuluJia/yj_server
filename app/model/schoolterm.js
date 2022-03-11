'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Schoolterm = app.model.define('schoolterm', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('createTime')).getTime();
      },
    },
    endTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('endTime')).getTime();
      },
    },
    term: INTEGER,
    userId: INTEGER,
    schoolId: INTEGER,
    title: STRING,
  });

  Schoolterm.associate = () => {
    // 一个用户对应多个标签
    app.model.Schoolterm.hasMany(app.model.Userscore, {
      foreignKey: 'connectId',
      as: 'item',
    });
  };

  return Schoolterm;
};
