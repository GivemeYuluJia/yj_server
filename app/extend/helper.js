'use strict';

const dayjs = require('dayjs');

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
