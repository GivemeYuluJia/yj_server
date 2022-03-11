'use strict';

const Controller = require('egg').Controller;
const BaseController = require('./base');

class UserController extends BaseController {
  // token 签名
  async jwtSign({ id, accountId }) {
    const { ctx, app } = this;
    // const accountId = ctx.request.body.accountId;
    // ctx 上面自己添加扩展函数
    const token = app.jwt.sign({
      id,
      accountId,
    }, app.config.jwt.secret);
    await app.redis.set(accountId, token, 'EX', app.config.redisExpire);

    return token;
  }
  // 1.注册
  async register() {
    const { ctx } = this;
    // const params = ctx.request.body;
    const params = ctx.params();
    const user = await ctx.service.user.getUser(params.accountId);

    if (user) {
      this.error('用户已存在');
      return;
    }

    const result = await ctx.service.User.addUser({
      ...params,
      createTime: ctx.helper.time(),
    });
    if (result) {
      // const token = await this.jwtSign();
      this.success({
        createTime: ctx.helper.timestamp(),
        // token,
      });
    } else {
      this.error('注册失败');
    }
  }
  // 2.登陆
  async login() {
    const { ctx, app } = this;
    const { accountId, password } = ctx.params();
    const user = await ctx.service.user.getUser(accountId, password);
    console.log('user', 'nnn');
    if (user) {
      const token = await this.jwtSign({
        id: user.id,
        accountId: user.accountId,
      });
      // const un = this.app.jwt.verify(token, this.app.config.jwt.secret);
      // console.log(un, 'yy');
      this.success({
        // ...ctx.helper.unPick(user.dataValues, [ 'password' ]),
        createTime: ctx.helper.timestamp(user.createTime),
        token,
      });
    } else {
      this.error('该用户不存在');
    }
  }
  // 3.获取当前用户信息
  async getCurrentUser() {
    const { ctx } = this;
    const user = await ctx.service.user.getUser(ctx.accountId);
    if (user) {
      this.success({
        ...ctx.helper.unPick(user.dataValues, [ 'password', 'province', 'provinceKey', 'city', 'cityKey' ]),
        createTime: ctx.helper.timestamp(user.createTime),
        updateTime: ctx.helper.timestamp(user.updateTime),
      });
    } else {
      this.error('该用户不存在');
    }
  }

  // 4.退出登陆
  async logout() {
    const { ctx } = this;
    try {
      await this.app.redis.del(ctx.accountId);
      this.success('ok');
    } catch (error) {
      this.error('退出登录失败');
    }
  }
  // 5.编辑用户
  async editCurrentUserInfo() {
    const { ctx } = this;
    const result = await ctx.service.user.editUser({
      ...ctx.prarms(),
      updateTime: ctx.helper.time(),
    });
    this.seccess(result);
  }
}

module.exports = UserController;
