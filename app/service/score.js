'use strict';

const { Service } = require('egg');
const BaseService = require('./base');

class ScoreService extends BaseService {
  async getScore(userId, SchoolId) {
    try {
      const { ctx, app } = this;
      const result = await ctx.model.Schoolterm.findAll({
        where: {
          userId,
          SchoolId,
        },
        include: [
          {
            model: app.model.Userscore,
            as: 'item',
            attributes: [ 'id', 'name', 'type', 'credit', 'score' ],
          },
        ],
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = ScoreService;
