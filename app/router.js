'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 城市
  router.get('/api2/geographic/province', controller.geographic.province);
  router.get('/api2/geographic/city/:provinceid', controller.geographic.city);
  // 用户
  router.post('/api2/user/register', controller.user.register);
  router.post('/api2/user/login', controller.user.login);
  router.post('/api2/user/getCurrentUser', controller.user.getCurrentUser);
  router.post('/api2/user/logout', controller.user.logout);
  router.post('/api2/user/editCurrentUserInfo', controller.user.editCurrentUserInfo);
};
