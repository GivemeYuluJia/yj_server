'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Usertag = app.model.define('usertag', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    label: STRING(50),
    color: INTEGER,
    userId: INTEGER,
  });
  return Usertag;
};
