'use strict';

const Service = require('egg').Service;
const BaseService = require('./base');

class CampusCardOrderService extends BaseService {
  async hasOrder(params) {
    try {
      const { ctx, app } = this;
      const result = await ctx.model.CampusCardOrders.findOne({
        where: {
          accountId: params.accountId,
          schoolId: params.schoolId,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async addOrder(params) {
    try {
      const { ctx, app } = this;
      const result = await ctx.model.CampusCardOrders.create(params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async list(params) {
    try {
      const { ctx, app } = this;
      const _where = (params.isPayed === 0 || params.isPayed === 1) ? {
        userId: params.userId,
        isPayed: params.isPayed,
      } : {
        userId: params.userId,
      };
      const res = await ctx.model.CampusCardOrders.findAll({
        where: _where,
      });
      const result = await ctx.model.CampusCardOrders.findAll({
        where: _where,
        limit: Number(params.pageSize),
        offset: (params.pageNum - 1) * Number(params.pageSize),
        order: [
          [ 'id', 'DESC' ],
        ],
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

  async pay(params) {
    try {
      const { ctx, app } = this;
      const result = ctx.model.CampusCardOrders.update({
        isPayed: 1,
        orderNumber: params.orderNumber,
      }, {
        where: {
          id: params.id,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async del(id) {
    try {
      const { ctx } = this;
      const result = await ctx.model.CampusCardOrders.destroy({
        where: {
          id,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = CampusCardOrderService;
