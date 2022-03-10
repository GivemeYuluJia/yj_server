'use strict';

module.exports = options => {
  return async (ctx, next) => {
    const user = await ctx.services.user.getUser(ctx.accountId);
    if (!user) {
      ctx.body = {
        status: 500,
        errMsg: '用户不存在',
      };
    } else {
      await next();
    }
  };
};
