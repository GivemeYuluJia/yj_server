'use strict';

module.exports = option => {
  return async (ctx, next) => {
    const url = ctx.request.url;

    const token = ctx.request.token;
    const accountId = await ctx.app.redis.get(ctx.accountId);
    const user = accountId ? accountId === token : accountId;

    console.log(user, url, ctx.accountId, 'yyy', accountId, 'jj', token);
    if (url.indexOf('/geographic') === -1 && !user && !option.exclude.includes(ctx.request.url.split('?')[0])) {
      ctx.body = {
        status: 1001,
        errMsg: '用户未登陆',
      };
    } else {
      await next();
    }
  };
};
