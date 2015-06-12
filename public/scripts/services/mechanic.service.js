app.factory('MechanicService', ['$http', function($http){
  return {
    // All Mechanic
    get : function() {
      return $http.get('/api/mechanics');
    },

    // Register
    create : function(data) {
      return $http.post('/api/mechanics', data);
    },

    // By ID
    getById : function(id) {
      return $http.get('/api/mechanics/' + id);
    },
    updateById : function(id) {
      return $http.put('/api/mechanics/' + id);
    },
    delete : function(id) {
      return $http.delete('/api/mechanics/' + id);
    },
  };
}])