app.factory('AdminService', ['$http', '$cookies', function($http, $cookies){
  return {
    // All Admin
    get : function () {
      return $http.get('/api/admin');
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
    updateById : function (id, sendtoken) {
      return $http.put('/api/admin/' + id + sendtoken)
    },
    deleteById : function (id, sendtoken) {
      return $http.delete('/api/admin/' + id + sendtoken)
    },
  };
}])