var mechanicRoutes  = require('./mechanic.route');
var adminRoutes     = require('./admin.route');

module.exports      = function(router) {
  mechanicRoutes(router);
  adminRoutes(router);
};