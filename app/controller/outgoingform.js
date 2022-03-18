'use strict';

const { Controller } = require('egg');
const BaseController = require('./base');

class OutgoingFormController extends BaseController {
  async invokeForm(params) {
    return {
      formNumber: '' + params.id + new Date().getTime(),
    };
  }
  //  发起外出请假单请求
  async initiateOutGoingForm() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.accountId);
    if (user) {
      try {
        const beforeForm = await this.invokeForm({ id: ctx.id });
        const params = ctx.params();
        const province = params.province.label;
        const provinceKey = params.province.key;
        const city = params.city.label;
        const cityKey = params.city.key;
        delete params.province;
        delete params.city;
        const result = await ctx.service.outgoingform.addForm({
          userId: ctx.id,
          ...params,
          province,
          provinceKey,
          city,
          cityKey,
          state: 2,
          formNumber: beforeForm.formNumber,
          createTime: ctx.helper.time(),
        });
        this.success(result);
      } catch (error) {
        this.error('请假单提交失败');
      }

    } else {
      this.error('用户不存在');
    }
  }
  // 返回外出请假单列表
  async getOutGoingFormList() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.accountId);
    if (user) {
      const result = await ctx.service.outgoingform.formList({
        ...ctx.params(),
        userId: ctx.id,
      });
      this.success({
        ...result,
        pageSize: ctx.params('pageSize'),
        pageNum: ctx.params('pageNum'),
      });
    } else {
      this.error('用户不存在');
    }

  }

  // 外出请假单 详情
  async getOutgoingFormDetail() {
    const { ctx, app } = this;
    const user = await ctx.service.user.getUser(ctx.accountId);
    if (user) {
      const result = await ctx.service.outgoingform.detail({
        ...ctx.params(),
        userId: ctx.id,
      });
      result.city = {
        key: result.cityKey,
        label: result.city,
        value: result.cityKey,
      };
      result.province = {
        key: result.provinceKey,
        label: result.province,
        value: result.provinceKey,
      };
      result.provinceKey = undefined;
      result.cityKey = undefined;
      console.log('yyyuuu');
      this.success(result);
    } else {
      this.error('用户不存在');
    }

  }
}
module.exports = OutgoingFormController;
