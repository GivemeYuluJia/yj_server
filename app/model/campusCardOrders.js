'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Campuscardorders = app.model.define('campusCardorders', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderNumber: STRING(20),
    userId: INTEGER,
    schoolId: INTEGER,
    isPayed: INTEGER,
    payMoney: INTEGER,
    createTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('createTime')).getTime();
      },
    },
    updateTime: {
      type: DATE,
      get() {
        return new Date(this.getDataValue('updateTime')).getTime();
      },
    },
  });

  return Campuscardorders;
};
