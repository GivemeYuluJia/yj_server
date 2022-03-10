'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const res = await app.model.Usertag.findAll();
    ctx.body = res;
  }
}

module.exports = HomeController;
