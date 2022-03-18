'use strict';

const { Controller } = require('egg');
const BaseController = require('./base');

class CampusCardOrderController extends BaseController {
  async add(params) {
    const { ctx, app } = this;
    const result = await ctx.service.campusCardOrders.addOrder({
      userId: params.userId,
      schoolId: params.schoolId,
      isPayed: params.isPayed,
      payMoney: params.payMoney,
      createTime: params.createTime,
    });
    return result;
  }

  async addCampusCardOrder() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.accountId);
    if (user) {
      const result = await this.add({
        userId: ctx.id,
        schoolId: ctx.params('schoolId'),
        isPayed: 0,
        payMoney: ctx.params('payMoney'),
        createTime: ctx.helper.time(),
      });
      this.success(result);
    } else {
      this.error('用户不存在');
    }

  }

  async getCampusCardOrdersList() {
    const { ctx, app } = this;
    const result = await ctx.service.campusCardOrders.list({
      ...ctx.params(),
      userId: ctx.id,
    });
    this.success({
      ...result,
      pageSize: ctx.params('pageSize'),
      pageNum: ctx.params('pageNum'),
    });
  }

  async invokePay(params) {
    return {
      orderNumber: params.id + new Date().getTime() + '',
    };
  }

  async payCampusCard() {
    const { ctx, app } = this;
    const { password, schoolId, payMoney, id } = ctx.params();
    let orderId;
    const user = await ctx.service.user.getUser(ctx.accountId);
    if (user) {
      if (password === user.password) {
        if (!id) {
          const result = await this.add({
            userId: ctx.id,
            schoolId,
            isPayed: 0,
            payMoney,
            createTime: ctx.helper.time(),
          });
          orderId = result.id;
        } else {
          console.log('yjyjaaaa');
          orderId = id;
        }
        const order = await ctx.model.CampusCardOrders.findByPk(orderId);
        if (order) {
          try {
            const beforePay = await this.invokePay({ id: orderId });
            const payresult = await ctx.service.campusCardOrders.pay({
              id: orderId,
              orderNumber: beforePay.orderNumber,
            });
            console.log(beforePay, 'ooo');
            this.success(payresult);
          } catch (error) {
            this.error('订单不存在');
          }
        } else {
          this.error('订单不存在');
        }
      } else {
        this.error('密码错误');
      }
    } else {
      this.error('用户不存在');
    }
  }

  async delCampusCardOrder() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.accountId);
    if (user) {
      const result = await ctx.service.campusCardOrders.del(ctx.params('id'));
      this.success(result);
    } else {
      this.error('用户不存在');
    }

  }
}

module.exports = CampusCardOrderController;

