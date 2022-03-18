'use strict';

const { Service } = require('egg');
const BaseService = require('./base');

class OutgoingFormService extends BaseService {
  async addForm(params) {
    try {
      const { ctx, app } = this;
      const result = await ctx.model.Outgoingform.create(params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async formList(params) {
    try {
      const { ctx, app } = this;
      const res = await ctx.model.Outgoingform.findAll({
        where: {
          userId: params.userId,
          schoolId: params.schoolId,
        },
      });
      const result = await ctx.model.Outgoingform.findAll({
        where: {
          userId: params.userId,
          schoolId: params.schoolId,
        },
        limit: Number(params.pageSize),
        offset: (params.pageNum - 1) * Number(params.pageSize),
        order: [
          [ 'id', 'DESC' ],
        ],
        attributes: {
          exclude: [ 'professionalGrade', 'phone', 'result', 'province', 'provinceKey', 'city', 'cityKey', 'address' ],
        },
      });
      return {
        data: result,
        total: res.length,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async detail(params) {
    try {
      const { ctx, app } = this;
      const result = await ctx.model.Outgoingform.findOne({
        where: {
          userId: params.userId,
          schoolId: params.schoolId,
          id: params.id,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = OutgoingFormService;
