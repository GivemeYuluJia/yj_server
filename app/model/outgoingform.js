'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Outgongform = app.model.define('outgoingform', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    formNumber: STRING(20),
    userId: INTEGER,
    schoolId: INTEGER,
    professionalGrade: STRING(30),
    phone: STRING(20),
    result: STRING(200),
    province: STRING(20),
    provinceKey: STRING(20),
    city: STRING(20),
    cityKey: STRING(20),
    address: STRING(20),
    state: INTEGER,
    startAt: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('startAt')).getTime();
      },
    },
    endAt: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('endAt')).getTime();
      },
    },
    createTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('createTime')).getTime();
      },
    },
  });
  return Outgongform;
};
