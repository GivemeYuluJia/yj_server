'use strict';

module.exports = app => {
  const { STRING, INTEGER, FLOAT } = app.Sequelize;
  const Userscore = app.model.define('userscore', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    type: STRING(30),
    credit: FLOAT,
    score: STRING(20),
    connecttermId: STRING(20),
  });
  return Userscore;
};
