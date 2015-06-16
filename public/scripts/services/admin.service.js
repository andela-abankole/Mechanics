app.factory('AdminService', ['$http', '$cookies', function($http, $cookies){
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

    getUser: function() {
      var user = $cookies.get('adminID');
      if (user) {
        return true;
      } else {
        return false;
      }
    }, 

    // By ID
    getById : function (id) {
      return $http.get('/api/admin/' + id)
    },
    updateById : function (id) {
      return $http.put('/api/admin/', id)
    },
    deleteById : function (id, sendtoken) {
      return $http.delete('/api/admin/' + id + sendtoken)
    },
  };
}])