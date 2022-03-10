'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    accountId: STRING(20),
    username: STRING(20),
    password: STRING(64),
    phone: STRING(20),
    avatar: TEXT('long'),
    sex: STRING(3),
    email: STRING(30),
    school: STRING(20),
    schoolName: STRING(20),
    signature: STRING(300),
    organization: STRING(100),
    title: STRING(100),
    country: STRING(20),
    province: STRING(20),
    provinceKey: STRING(20),
    city: STRING(20),
    cityKey: STRING(20),
    address: STRING(20),
    createTime: DATE,
    updateTime: DATE,
  });

  User.associate = () => {
    // 一个用户对应多个标签
    app.model.User.hasMany(app.model.Usertag, {
      foreignKey: 'userId',
      // targetKey: 'id',
      as: 'tags',
    });
  };
  return User;
};

