'use strict';

module.exports = {
  params(key) {
    const method = this.request.method;
    if (method === 'GET') {
      return key ? this.query[key] : this.query;
    }
    return key ? this.request.body[key] : this.request.body;
  },
  // 获取accountId
  get accountId() {
    const token = this.request.header.token;
    try {
      const tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined;
      return tokenCache ? tokenCache.accountId : undefined;
    } catch (error) {
      console.log(error);
      return null;
    }

  },
  // 获取 id
  get id() {
    const token = this.request.header.token;
    try {
      const tokenCache = token ? this.app.jwt.verify(token, this.app.config.jwt.secret) : undefined;
      return tokenCache ? tokenCache.id : undefined;
    } catch (error) {
      console.log(error);
      return null;
    }

  },
};
