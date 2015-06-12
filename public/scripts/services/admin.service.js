app.factory('AdminService', ['$http', function($http){
  return {
    // All Admin
    get : function () {
      return $http.get('/api/admin');
    },

    // Register
    create : function (formAdmin) {
      return $http.post('/api/admin/register', formAdmin)
    },

    // Authenticate
    login: function(params) {
      return $http.post('/api/authenticate', { username: params.username, password: params.password })
    },

    // By ID
    getById : function (id) {
      return $http.get('/api/admin/', id)
    },
    updateById : function (id) {
      return $http.put('/api/admin/', id)
    },
    deleteById : function (id) {
      return $http.delete('/api/admin/', id)
    },
  };
}])