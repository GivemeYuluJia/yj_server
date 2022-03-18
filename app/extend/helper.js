'use strict';

const dayjs = require('dayjs');
// node.js 路径操作对象
const path = require('path');
// node.js 文件操作对象
const fs = require('fs');

module.exports = {
  base64Encode(str = '') {
    return new Buffer.toString('base64');
  },

  time() {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  },
  timestamp(date) {
    return new Date(date).getTime();
  },
  getGeographic(i, geographic, source) {
    if (i === 'province') {
      geographic.province.label = source[i];
    }
    if (i === 'provinceKey') {
      geographic.province.key = source[i];
    }
    if (i === 'city') {
      geographic.city.label = source[i];
    }
    if (i === 'cityKey') {
      geographic.city.key = source[i];
    }

  },
  addTagKey(tags, id) {
    return tags.map(item => {
      item.dataValues.key = 'tag-' + id + '-' + item.dataValues.id;
      return item;
    });
  },
  unPick(source, arr) {
    if (Array.isArray(arr)) {
      const obj = {};
      obj.geographic = {};
      obj.geographic.province = {};
      obj.geographic.city = {};
      for (const i in source) {
        if (!arr.includes(i)) {
          obj[i] = source[i];
        }
        if (i === 'tags') {
          // console.log(i, '???', obj[i], source.id);
          obj[i] = this.addTagKey(obj[i], source.id);
        }
        this.getGeographic(i, obj.geographic, source);
      }
      return obj;
    }
  },
};

module.exports.tools = {
  // 异步写法
  // 传入文件夹的路径看是否存在，存在不用管，不存在则直接创建文件夹
  /**
     * 判断文件夹是否存在，不存在可以直接创建
     * @param reaPath {String} 文件路径
     * @return {Promise<boolean>}
     */
  async exitsFolderAsync(reaPath) {
    const absPath = path.resolve(__dirname, reaPath);
    try {
      await fs.promises.stat(absPath);
    } catch (e) {
      // 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
      await fs.promises.mkdir(absPath, { recursive: true });
    }
  },
};
