'use strict';

const Service = require('egg').Service;
const BaseService = require('./base');

class UserService extends BaseService {
  // 获取用户
  async getUser(accountId, password) {
    try {
      const { ctx, app } = this;
      const _where = password ? { accountId, password } : { accountId };
      const result = await ctx.model.User.findOne({
        where: _where,
        include: [
          {
            model: app.model.Usertag,
            as: 'tags',
            attributes: [ 'id', 'color', 'label' ],
          },
        ],
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 添加用户
  async addUser(params) {
    try {
      const { ctx } = this;
      const result = await ctx.model.User.create(params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // 编辑用户
  async editUser(params) {
    return this.run(async ctx => {
      const result = await ctx.model.User.update(params, {
        where: {
          accountId: ctx.accountId,
        },
      });
      return result;
    });
  }
}

module.exports = UserService;
