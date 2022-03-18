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
  router.post('/api2/user/addUserTags', controller.user.addUserTags);
  router.post('/api2/user/updateAvatar', controller.user.updateAvatar);
  // 校园卡
  router.post('/api2/campusCard/addCampusCardOrder', controller.campusCardOrders.addCampusCardOrder);
  router.post('/api2/campusCard/payCampusCard', controller.campusCardOrders.payCampusCard);
  router.post('/api2/campusCard/getCampusCardOrdersList', controller.campusCardOrders.getCampusCardOrdersList);
  router.post('/api2/campusCard/delCampusCardOrder', controller.campusCardOrders.delCampusCardOrder);
  // 外出请假单 getOutgoingFormDetail
  router.post('/api2/outgoingform/initiateOutGoingForm', controller.outgoingform.initiateOutGoingForm);
  router.post('/api2/outgoingform/getOutGoingFormList', controller.outgoingform.getOutGoingFormList);
  router.post('/api2/outgoingform/getOutgoingFormDetail', controller.outgoingform.getOutgoingFormDetail);
  // 成绩查询
  router.post('/api2/score/getSchoolScore', controller.score.getSchoolScore);
};
