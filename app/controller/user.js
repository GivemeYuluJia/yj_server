'use strict';

const Controller = require('egg').Controller;
const BaseController = require('./base');

const path = require('path');
// node.js 文件操作对象
const fs = require('fs');
// 故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');
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
    const params = ctx.request.body;
    const province = params.geographic.province.label;
    const provinceKey = params.geographic.province.key;
    const city = params.geographic.city.label;
    const cityKey = params.geographic.city.key;
    delete params.geographic;
    const result = await ctx.service.user.editUser({
      ...params,
      province,
      provinceKey,
      city,
      cityKey,
      updateTime: ctx.helper.time(),
    });
    this.success({
      data: '修改成功',
    });
  }

  // 6.新增用户标签
  async addUserTags() {
    const { ctx } = this;
    // const params = ctx.request.body;
    const params = {
      ...ctx.params(),
      userId: ctx.id,
    };
    // ctx.body = params;
    const result = await ctx.service.user.addTags({
      ...params,
    });
    if (result) {
      this.success({
        data: '添加成功',
      });
    } else {
      this.error('添加失败');
    }
  }

  // 修改头像
  async updateAvatar() {
    const { ctx, app } = this;
    // const file = ctx.request.files[0];
    const user = await ctx.service.user.getUser(ctx.accountId);
    if (user) {
      const stream = await ctx.getFileStream();
      // stream.fields拿到传过来的另外json
      const filename = md5(stream.filename + new Date()) +
        path.extname(stream.filename)// 取出后缀名.jpg
          .toLocaleLowerCase();
      // 文件生成绝对路径
      const targetDir = path.join(this.config.baseDir, `app/public/avatars/${user.accountId}`);
      // 查看文件夹是否存在不存在就生成
      await ctx.helper.tools.exitsFolderAsync(targetDir);
      const target = path.join(targetDir, filename);
      // 生成一个文件写入 文件流
      const writeStream = fs.createWriteStream(target);
      try {
        // 异步把文件流 写入
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        // 如果出现错误，关闭管道
        await sendToWormhole(stream);
        throw err;
      }
      await ctx.service.user.updateAvatar({
        id: user.id,
        accountId: user.accountId,
        filename,
      });
      this.success({
        url: `/public/avatars/${user.accountId}/` + filename,
        msg: 'ok',
      });
      console.log(filename, targetDir, target);
    } else {
      this.error('用户未登录');
    }
  }
}

module.exports = UserController;
