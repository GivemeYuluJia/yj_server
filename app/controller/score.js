'use strict';

const { Controller } = require('egg');
const BaseController = require('./base');

class ScoreController extends BaseController {
  async getSchoolScore() {
    const { ctx } = this;
    const schoolId = ctx.params('schoolId');
    const score = await ctx.service.score.getScore(ctx.id, schoolId);
    if (score) {
      this.success(score);
    } else {
      this.error('信息为空');
    }
  }
}

module.exports = ScoreController;
