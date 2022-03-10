'use strict';
const Controller = require('egg').Controller;
const BaseController = require('./base');
const province = require('../public/province');
const city = require('../public/city');

class GeographicController extends BaseController {
  async province() {
    const { ctx, app } = this;
    console.log('yjyj');
    this.success(province);
  }
  async city() {
    const { ctx, app } = this;
    const provinceid = ctx.params.provinceid;
    // console.log('yjyj');
    if (city[provinceid]) {
      this.success(city[provinceid]);
    } else {
      this.error('');
    }
  }
}

module.exports = GeographicController;
